/*eslint-disable*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Card } from '../cards/card.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.transactions)
  card: Card;

  @Column()
  amount: number;

  @Column()
  type: 'deposit' | 'withdrawal';

  @CreateDateColumn()
  timestamp: Date;
}
