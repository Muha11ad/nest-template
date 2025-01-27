import {
  Injectable,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repository';
import { USER_MESSAGES } from '../user.consts';
import { UserEntity } from '@/database/entities';
import { LoggerProvider } from '@/common/providers';
import { IUserService } from './user.service.interface';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from '../dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerProvider,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  private getUserById(userId: number) {
    return this.userRepository.findById(userId);
  }
  private getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async getAllUser(): Promise<UserEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new BadGatewayException(USER_MESSAGES.error_fetch_all);
    }
  }

  public async createUser(data: UserCreateDto): Promise<string> {
    const user = await this.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException(USER_MESSAGES.warning_email_exist);
    }
    try {
      const hashedPassword = await hash(data.password, 10);
      data.password = hashedPassword;
      await this.userRepository.create(data);
      const secret = this.configService.get('JWT_SECRET') || 'secret';
      return this.jwtService.sign({ email: data.email }, { secret });
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_create_user);
    }
  }

  private async updatingUserChecker(id: number, data: UserUpdateDto, reqEmail: string) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.user_not_found);
    }

    if (data.email) {
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser) {
        throw new BadRequestException(USER_MESSAGES.warning_email_exist);
      }
    }
    if (user.email !== reqEmail) {
      throw new NotAcceptableException(USER_MESSAGES.warninng_not_permited);
    }
    if (data.password) {
      const hashedPassword = await hash(data.password, 10);
      data.password = hashedPassword;
    }
  }

  public async updateUser(id: number, data: UserUpdateDto, reqEmail: string): Promise<string> {
    await this.updatingUserChecker(id, data, reqEmail);
    try {
      return this.userRepository.update(id, data);
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_update_user);
    }
  }

  private async deletingUserChecker(id: number, reqEmail: string) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.user_not_found);
    }
    if (user.email !== reqEmail) {
      throw new NotAcceptableException(USER_MESSAGES.warninng_not_permited);
    }
  }

  public async deleteUser(id: number, reqEmail: string): Promise<string> {
    await this.deletingUserChecker(id, reqEmail);
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_delete_user);
    }
  }

  public async validateUser(data: UserLoginDto): Promise<string> {
    const user = await this.getUserByEmail(data.email);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.user_not_found);
    }
    const isPasswordMatch = await compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException(USER_MESSAGES.warning_wrong_password);
    }
    const secret = this.configService.get('JWT_SECRET') || 'secret';
    return this.jwtService.sign({ email: data.email }, { secret });
  }
}
