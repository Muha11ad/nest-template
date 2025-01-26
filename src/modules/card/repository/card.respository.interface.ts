import { CardEntity } from '@/database/entities';
import { CardCreateDto, CardTransferDto } from '../dto';

export interface ICardRepository {
  findAll(): Promise<CardEntity[]>;
  delete(id: number): Promise<string>;
  findById(id: number): Promise<CardEntity>;
  create(data: CardCreateDto): Promise<CardEntity>;
  transaction(data: CardTransferDto): Promise<string>;
  updateBalance(id: number, amount: number): Promise<string>;
}
