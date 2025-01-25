import { IdDto } from '@/common/dto';
import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { MyRequest } from '@/common/guards/auth.guard';

export interface IUserController {
  delete(id: IdDto): Promise<string>;
  create(data: UserCreateDto): Promise<string>;
  update(req: MyRequest, id: IdDto, data: UserUpdateDto): Promise<string>;
  getAll(id: IdDto, data: UserCreateDto): Promise<UserEntity[]>;
}
