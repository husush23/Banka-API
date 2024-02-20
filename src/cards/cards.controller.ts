/*eslint-disable*/
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Card } from './card.entity';
import { CardsService } from './cards.service';
import { time } from 'console';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}
  @Get('userId') // ---> /not sure
  findUsers(@Param('userId') userId: string) {
    return this.cardService.findAllUsers(userId);
  }

  @Get('/info/:id')
  findOneUser(@Param('id') id: number) {
    return this.cardService.findOneUser(id);
  }

  @Post()
  createCard(@Body() card: Card) {
    return this.cardService.createCard(card);
  }

  @Put(':id')
  updateCard(@Param('id') id: number, @Body() cardInfo: Partial<Card>) {
    return this.cardService.updateCard(id, cardInfo);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.cardService.deleteCard(id);
  }
}
