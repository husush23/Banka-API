/*eslint-disable*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Transactions } from 'src/trasactions/transaction.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: number;

  @Column()
  balance: number;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;

  @OneToMany(() => Transactions, (transaction) => transaction.card)
  transactions: Transactions[];
}
