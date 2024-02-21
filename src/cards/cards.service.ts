/*eslint-disable*/
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { User } from '../users/user.entity';
import { Transactions } from '../trasactions/transaction.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  async createCard(
    cardNumber: number,
    balance: number,
    title: string,
    userId: number,
  ): Promise<Card> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const items = { cardNumber, balance, title, user };
    const newCard = this.cardsRepository.create({ ...items });
    await this.cardsRepository.save(newCard);
    return newCard;
  }

  findAllCards(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['user'] });
  }

  async findOneCard(id: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with id of ${id} not found`);
    }
    return card;
  }
  async deleteCard(id: number): Promise<void> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
  }

  async deposit(cardId: number, amount: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card)
      throw new NotFoundException(`Card with ID of "${cardId}" not found`);

    card.balance += amount;
    await this.cardsRepository.save(card);

    await this.transactionRepository.save({ card, amount, type: 'deposit' });
    return card;
  }

  async withdraw(cardId: number, amount: number): Promise<Card> {
    const card = await this.cardsRepository.findOneBy({ id: cardId });
    if (!card)
      throw new NotFoundException(`Card with ID of "${cardId}" not found`);
    if (card.balance < amount)
      throw new BadRequestException('Insufficient funds');

    card.balance -= amount;
    await this.cardsRepository.save(card);

    await this.transactionRepository.save({ card, amount, type: 'withdrawal' });

    return card;
  }

  async getTransactions(cardId: number): Promise<Transactions[]> {
    return this.transactionRepository.find({ where: { card: { id: cardId } } });
  }
}
