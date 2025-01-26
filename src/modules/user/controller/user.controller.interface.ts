import { IdDto } from '@/common/dto';
import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from '../dto';
import { MyRequest } from '@/common/guards/auth.guard';

export interface IUserController {
  login(data: UserLoginDto): Promise<string>;
  create(data: UserCreateDto): Promise<string>;
  delete(req: MyRequest, id: IdDto): Promise<string>;
  update(req: MyRequest, id: IdDto, data: UserUpdateDto): Promise<string>;
  getAll(id: IdDto, data: UserCreateDto): Promise<UserEntity[]>;
}
