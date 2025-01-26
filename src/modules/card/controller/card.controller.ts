import { IdDto } from '@/common/dto';
import { AuthGuard } from '@/common/guards';
import { CardEntity } from '@/database/entities';
import { CardService } from '../service/card.service';
import { MyRequest } from '@/common/guards/auth.guard';
import { ICardController } from './card.controller.interface';
import { CardCreateDto, CardTransferDto, CardUpdateBalanceDto } from '../dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

@Controller('card')
export class CardController implements ICardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  async getAll(): Promise<CardEntity[]> {
    return await this.cardService.findAll();
  }
  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: MyRequest, @Body() data: CardCreateDto) {
    const email = req.user;
    return await this.cardService.createCard(email, data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Req() req: MyRequest, @Param() param: IdDto) {
    const email = req.user;

    return await this.cardService.deleteCard(email, Number(param.id));
  }
  @Post('transfer')
  @UseGuards(AuthGuard)
  async transfer(@Req() req: MyRequest, @Body() data: CardTransferDto) {
    const email = req.user;
    return await this.cardService.transferMoney(email, data);
  }
  @Put('balance/:id')
  @UseGuards(AuthGuard)
  async updateBalance(
    @Req() req: MyRequest,
    @Param() param: IdDto,
    @Body() data: CardUpdateBalanceDto,
  ): Promise<string> {
    const email = req.user;
    return await this.cardService.updateBalance(email, Number(param.id), data);
  }
}
