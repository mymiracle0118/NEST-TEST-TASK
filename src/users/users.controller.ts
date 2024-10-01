import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
@Controller('api/v1')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-user/:id')
  findOne(@Param('id') id): Promise<User> {
    return this.UsersService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-user')
  create(@Body() CreateUser: CreateUserDto): Promise<User> {
    return this.UsersService.create(CreateUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('del-user/:id')
  delete(@Param('id') id): Promise<void> {
    return this.UsersService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-user/:id')
  update(@Body() UpdateUser: CreateUserDto, @Param('id') id): Promise<User> {
    return this.UsersService.update(UpdateUser, id);
  }
}
