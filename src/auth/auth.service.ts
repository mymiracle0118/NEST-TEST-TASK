import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { Users } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log("user===========================>", user);
    if (user) {
      if (email !== user.email || password !== user.password) {
        return { data: null, message: 'wrong email or password' };
      }
      return { data: user };
    }
    return { data: null, message: 'There is no such user' };
  }

  async login(user: Users): Promise<{ access_token: string }> {
    const { email, username } = user;
    return {
      access_token: this.jwtService.sign({ email, sub: username}),
    };
  }
}
