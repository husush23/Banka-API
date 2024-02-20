import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';

@Module({
  controllers: [CardsController],
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
})
export class CardsModule {}
