import { IdDto } from '@/common/dto';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from '../dto';
import { UserService } from '../service/user.service';
import { IUserController } from './user.controller.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/common/guards';
import { MyRequest } from '@/common/guards/auth.guard';

@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAllUser();
  }

  @Post()
  async create(@Body() data: UserCreateDto): Promise<string> {
    return await this.userService.createUser(data);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Req() req: MyRequest, @Param() param: IdDto) {
    return await this.userService.deleteUser(Number(param.id), req.user);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Req() req: MyRequest, @Param() param: IdDto, @Body() data: UserUpdateDto) {
    return await this.userService.updateUser(Number(param.id), data, req.user);
  }

  @Post('login')
  async login(@Body() data: UserLoginDto) {
    return await this.userService.validateUser(data);
  }
}
