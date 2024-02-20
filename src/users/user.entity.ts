/*eslint-disable*/

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Card } from 'src/cards/card.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}
