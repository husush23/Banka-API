/*eslint-disable*/
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(
    @Body('cardNumber') cardNumber: number,
    @Body('balance') balance: number,
    @Body('title') title: string,
    @Body('userId') userId: number,
  ) {
    return this.cardsService.createCard(cardNumber, balance, title, userId);
  }

  @Get()
  async getAllCards() {
    return this.cardsService.findAllCards();
  }

  @Get(':id')
  findOneCard(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.findOneCard(id);
  }

  @Delete(':id')
  deleteCard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}
