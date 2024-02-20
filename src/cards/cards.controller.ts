
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(
    @Body('title') title: string,
    @Body('userId') userId: number,
  ) {
    return this.cardsService.createCard(title, userId);
  }

  @Get()
  async getAllCards() {
    return this.cardsService.findAllCards();
  }
}
