/*eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
  ) {}
  findAllUsers(userId: string): Promise<Card[]> {
    return this.cardsRepository.find({ where: { userId } });
  }

  findOneUser(userId: string): Promise<Card> {
    return this.cardsRepository.findOneBy({ userId });
  }

  async createCard(card: Card): Promise<Card> {
    return this.cardsRepository.save(card);
  }

  async updateCard(id: number, cardInfo: Partial<Card>): Promise<Card> {
    const card = this.cardsRepository.findOneBy({ id });
    if (card) {
      await this.cardsRepository.update(id, cardInfo);
      return this.cardsRepository.findOneBy({ id });
    }
    return null;
  }

  async deleteCard(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }
}
