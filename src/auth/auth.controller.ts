import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Body,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from '../users/users.model';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService,
    @Inject('UsersService') private readonly usersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(@Body() body: CreateUserDto,): Promise<Users> {
    return this.authService.login(body);
  }

  @HttpCode(200)
  @Post('/register')
  async register(
    @Body() body: CreateUserDto,
  ): Promise<Users | { code: number; message: string }> {
    const { email } = body;
    const user = await this.usersService.findOne(email);
    if (user && user.id) {
      return { code: 403, message: 'This email already exists' };
    }
    return this.usersService.create(body);
  }
}
