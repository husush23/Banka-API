/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { User } from 'src/users/user.entity';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Transactions } from 'src/trasactions/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, User, Transactions])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
