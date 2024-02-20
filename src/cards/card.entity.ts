/*eslint-disable*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

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
}
