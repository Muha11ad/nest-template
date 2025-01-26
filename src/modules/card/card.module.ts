import { UserModule } from '../user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from '@/database/entities';
import { ProviderModule } from '@/common/providers';
import { CardService } from './service/card.service';
import { CardController } from './controller/card.controller';
import { CardRepository } from './repository/card.respository';

@Module({
  imports: [ProviderModule, UserModule, TypeOrmModule.forFeature([CardEntity])],
  controllers: [CardController],
  providers: [CardRepository, CardService],
})
export class CardModule {}
