import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from '../dto';

export interface IUserService {
  getAllUser(): Promise<UserEntity[]>;
  createUser(data: UserCreateDto): Promise<string>;
  validateUser(data: UserLoginDto): Promise<string>;
  deleteUser(id: number, reqEmail: string): Promise<string>;
  updateUser(id: number, data: UserUpdateDto, reqEmail: string): Promise<string>;
}
