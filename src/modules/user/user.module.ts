import { Module } from '@nestjs/common';
import { UserRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/database/entities';
import { ProviderModule } from '@/common/providers';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';

@Module({
  imports: [ProviderModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule {}
