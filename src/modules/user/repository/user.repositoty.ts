import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { USER_MESSAGES } from '../user.consts';
import { UserEntity } from '@/database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { IUserRepository } from './user.repositoty.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private database: Repository<UserEntity>,
  ) {}

  async find(): Promise<UserEntity[]> {
    return this.database.find();
  }
  async delete(id: number): Promise<string> {
    await this.database.delete(id);
    return USER_MESSAGES.success_delele;
  }
  async findById(id: number): Promise<UserEntity | null> {
    return this.database.findOne({
      where: { id },
    });
  }
  async create(data: UserCreateDto): Promise<UserEntity> {
    return this.database.save(data);
  }
  async update(id: number, data: UserUpdateDto): Promise<string> {
    await this.database.update(id, data);
    return USER_MESSAGES.success_update;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.database.findOne({
      where: { email },
    });
  }
}
