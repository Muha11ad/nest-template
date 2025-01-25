import {
  Injectable,
  NotFoundException,
  BadGatewayException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repository';
import { USER_MESSAGES } from '../user.consts';
import { UserEntity } from '@/database/entities';
import { LoggerProvider } from '@/common/providers';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { IUserService } from './user.service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerProvider,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  private async getUserById(userId: number) {
    return await this.userRepository.findById(userId);
  }
  private async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  public async getAllUser(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
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
      await this.userRepository.create(data);
      const secret = this.configService.get('JWT_SECRET') || 'secret';
      return this.jwtService.sign({ email: data.email }, { secret });
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_fetch_all);
    }
  }

  private async updatingUserChecker(id: number, data: UserUpdateDto) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.user_not_found);
    }
    if (data['email']) {
      const user = await this.getUserByEmail(data?.email);
      if (user) {
        throw new NotFoundException(USER_MESSAGES.warning_email_exist);
      }
    }
  }

  public async updateUser(id: number, data: UserUpdateDto): Promise<string> {
    await this.updatingUserChecker(id, data);
    try {
      return await this.userRepository.update(id, data);
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_fetch_all);
    }
  }

  public async deleteUser(id: number): Promise<string> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.user_not_found);
    }
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      this.logger.logError('USER-SERVICE', 500, error.message);
      throw new BadGatewayException(USER_MESSAGES.error_fetch_all);
    }
  }
}
