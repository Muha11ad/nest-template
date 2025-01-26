import { IdDto } from '@/common/dto';
import { CardEntity } from '@/database/entities';
import { MyRequest } from '@/common/guards/auth.guard';
import { CardCreateDto, CardTransferDto, CardUpdateBalanceDto } from '../dto';

export interface ICardController {
  getAll(): Promise<CardEntity[]>;
  delete(req: MyRequest, param: IdDto): Promise<string>;
  create(req: MyRequest, data: CardCreateDto): Promise<CardEntity>;
  transfer(req: MyRequest, data: CardTransferDto): Promise<string>;
  updateBalance(req: MyRequest, param: IdDto, data: CardUpdateBalanceDto): Promise<string>;
}
