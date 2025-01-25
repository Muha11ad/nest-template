import { IdDto } from '@/common/dto';
import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserUpdateDto } from '../dto';

export interface IUserController {
  delete(id: IdDto): Promise<string>;
  create(data: UserCreateDto): Promise<UserEntity>;
  update(id: IdDto, data: UserUpdateDto): Promise<string>;
  getAll(id: IdDto, data: UserCreateDto): Promise<UserEntity[]>;
}
