import { Injectable } from '@nestjs/common';
import { CARD_MESSAGES } from '../card.consts';
import { CardEntity } from '@/database/entities';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardCreateDto, CardTransferDto } from '../dto';
import { ICardRepository } from './card.respository.interface';

@Injectable()
export class CardRepository implements ICardRepository {
  constructor(
    @InjectRepository(CardEntity)
    private readonly database: Repository<CardEntity>,
    private readonly typeOrm: DataSource,
  ) {}

  public async create(data: CardCreateDto): Promise<CardEntity> {
    return this.database.save(data);
  }

  public async delete(id: number): Promise<string> {
    await this.database.delete(id);
    return CARD_MESSAGES.success_delete;
  }

  public async transaction(data: CardTransferDto): Promise<string> {
    return this.typeOrm.transaction(async (manager) => {
      try {
        const senderCard = await manager.findOne(CardEntity, {
          where: { id: data.sender_card_id },
        });
        const receiverCard = await manager.findOne(CardEntity, {
          where: { id: data.reciever_card_id },
        });

        const senderUpdatedBalance = senderCard.balance - data.amount;
        const recieversUpdatedBalance = receiverCard.balance + data.amount;

        await manager.update(CardEntity, data.sender_card_id, { balance: senderUpdatedBalance });
        await manager.update(CardEntity, data.reciever_card_id, {
          balance: recieversUpdatedBalance,
        });

        return CARD_MESSAGES.success_transfer;
      } catch (error) {
        return CARD_MESSAGES.error_transfer;
      }
    });
  }

  public async findById(id: number): Promise<CardEntity> {
    return this.database.findOne({
      where: { id },
    });
  }

  public async findAll(): Promise<CardEntity[]> {
    return this.database.find();
  }

  public async updateBalance(id: number, amount: number): Promise<string> {
    await this.database.update(id, { balance: amount });
    return CARD_MESSAGES.success_update_balance;
  }
}
