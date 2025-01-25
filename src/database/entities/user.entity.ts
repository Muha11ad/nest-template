import { Card } from './card.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Card, (card) => card.user, { cascade: true, onDelete: 'CASCADE' })
  cards: Card[];
}
