import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserUpdateDto } from '../dto';

export interface IUserService {
  getAllUser(): Promise<UserEntity[]>;
  deleteUser(id: number): Promise<string>;
  createUser(data: UserCreateDto): Promise<UserEntity>;
  updateUser(id: number, data: UserUpdateDto): Promise<string>;
}
