/*eslint-disable*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CardsModule,
    UsersModule,
  ],
})
export class AppModule {}
