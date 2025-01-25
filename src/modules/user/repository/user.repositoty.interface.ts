import { UserEntity } from '@/database/entities';
import { UserCreateDto, UserUpdateDto } from '../dto';

export interface IUserRepository {
  find(): Promise<UserEntity[]>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;

  delete(id: number): Promise<string>;
  create(data: UserCreateDto): Promise<UserEntity | null>;
  update(id: number, data: UserUpdateDto): Promise<string>;
}
