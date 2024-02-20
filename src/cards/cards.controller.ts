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

  // Transactions

  @Post(':id/deposit')
  deposit(
    @Param('id', ParseIntPipe) cardId: number,
    @Body('amount') amount: number,
  ) {
    return this.cardsService.deposit(cardId, amount);
  }

  @Post(':id/withdraw')
  withdraw(
    @Param('id', ParseIntPipe) cardId: number,
    @Body('amount') amount: number,
  ) {
    return this.cardsService.withdraw(cardId, amount);
  }

  @Get(':id/transactions')
  getTransactions(@Param('id', ParseIntPipe) cardId: number) {
    return this.cardsService.getTransactions(cardId);
  }
}
