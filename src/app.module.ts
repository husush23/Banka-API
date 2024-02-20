/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sql',
      entities: [__dirname, '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CardsModule,
  ],
})
export class AppModule {}
