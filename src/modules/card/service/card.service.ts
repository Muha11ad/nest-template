import { CARD_MESSAGES } from '../card.consts';
import { CardEntity } from '@/database/entities';
import { LoggerProvider } from '@/common/providers';
import { ICardService } from './card.service.interface';
import { UserRepository } from '@/modules/user/repository';
import { CardRepository } from '../repository/card.respository';
import { CardCreateDto, CardTransferDto, CardUpdateBalanceDto } from '../dto';
import { Injectable, NotFoundException, BadGatewayException } from '@nestjs/common';

@Injectable()
export class CardService implements ICardService {
  constructor(
    private readonly logger: LoggerProvider,
    private readonly userRepository: UserRepository,
    private readonly cardRepository: CardRepository,
  ) {}

  public async createCard(email: string, data: CardCreateDto): Promise<CardEntity> {
    const user = await this.userRepository.findById(data.user_id);
    if (!user) {
      throw new NotFoundException(CARD_MESSAGES.error_user_not_found);
    }
    if (user.email !== email) {
      throw new BadGatewayException(CARD_MESSAGES.error_user_not_match);
    }
    try {
      return await this.cardRepository.create(data);
    } catch (error) {
      this.logger.logError('CARD-SERVICE', 500, error.message);
      throw new BadGatewayException(CARD_MESSAGES.error_create);
    }
  }

  public async deleteCard(email: string, id: number): Promise<string> {
    const card = await this.cardRepository.findById(id);
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.error_card_not_found);
    }
    const user = await this.userRepository.findById(card.user_id);
    if (user.email !== email) {
      throw new NotFoundException(CARD_MESSAGES.error_user_not_found);
    }
    try {
      return await this.cardRepository.delete(id);
    } catch (error) {
      this.logger.logError('CARD-SERVICE', 500, error.message);
      throw new BadGatewayException(CARD_MESSAGES.error_delete);
    }
  }

  private async transferMoneyChecker(email: string, data: CardTransferDto): Promise<void> {
    const user = await this.userRepository.findById(data.user_id);
    if (!user) {
      throw new NotFoundException(CARD_MESSAGES.error_user_not_found);
    }
    const card = await this.cardRepository.findById(data.sender_card_id);
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.error_card_not_found);
    }
    const receiverCard = await this.cardRepository.findById(data.reciever_card_id);
    if (!receiverCard) {
      throw new NotFoundException(CARD_MESSAGES.error_receiver_card_not_found);
    }
    if (card.balance < data.amount) {
      throw new BadGatewayException(CARD_MESSAGES.error_not_enough_balance);
    }
    if (user.email !== email) {
      throw new BadGatewayException(CARD_MESSAGES.error_user_not_match);
    }
  }
  public async transferMoney(email: string, data: CardTransferDto): Promise<string> {
    await this.transferMoneyChecker(email, data);
    try {
      return await this.cardRepository.transaction(data);
    } catch (error) {
      this.logger.logError('CARD-SERVICE', 500, error.message);
      throw new BadGatewayException(CARD_MESSAGES.error_transfer);
    }
  }

  public async updateBalance(
    email: string,
    id: number,
    data: CardUpdateBalanceDto,
  ): Promise<string> {
    const card = await this.cardRepository.findById(id);
    if (!card) {
      throw new NotFoundException(CARD_MESSAGES.error_card_not_found);
    }
    const user = await this.userRepository.findById(card.user_id);
    if (user.email !== email) {
      throw new NotFoundException(CARD_MESSAGES.error_user_not_found);
    }

    try {
      const updatedBalance = card.balance + data.amount;
      return this.cardRepository.updateBalance(id, updatedBalance);
    } catch (error) {
      this.logger.logError('CARD-SERVICE', 500, error.message);
      throw new BadGatewayException(CARD_MESSAGES.error_update_balance);
    }
  }

  public async findAll(): Promise<CardEntity[]> {
    return await this.cardRepository.findAll();
  }
}
