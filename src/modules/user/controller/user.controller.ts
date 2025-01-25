import { IdDto } from '@/common/dto';
import { UserCreateDto, UserUpdateDto } from '../dto';
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
  async delete(@Param() param: IdDto) {
    return await this.userService.deleteUser(Number(param.id));
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Req() req: MyRequest, @Param() param: IdDto, @Body() data: UserUpdateDto) {
    return await this.userService.updateUser(Number(param.id), data);
  }
}
