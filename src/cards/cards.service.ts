
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createCard(title: string, userId: number): Promise<Card> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const newCard = this.cardsRepository.create({ title, user });
    await this.cardsRepository.save(newCard);
    return newCard;
  }

  findAllCards(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['user'] });
  }
}
