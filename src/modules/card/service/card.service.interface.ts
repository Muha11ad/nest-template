import { CardEntity } from '@/database/entities';
import { CardCreateDto, CardUpdateBalanceDto } from '../dto';

export class ICardService {
  findAll: () => Promise<CardEntity[]>;
  deleteCard: (email: string, id: number) => Promise<string>;
  transferMoney: (email: string, data: any) => Promise<string>;
  createCard: (email: string, data: CardCreateDto) => Promise<CardEntity>;
  updateBalance: (email: string, id: number, data: CardUpdateBalanceDto) => Promise<string>;
}
