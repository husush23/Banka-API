/*eslint-disable*/
import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  cardNumber: string;

  @Column({ default: 0 })
  balance: number;
}
