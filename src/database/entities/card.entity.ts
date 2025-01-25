import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  card_number: number;

  @Column({ default: 0 })
  balance: number;
  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
