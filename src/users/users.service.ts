import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userModel.findAll();
  }
  async findOne(email: string): Promise<Users> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<Users> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(User: CreateUserDto): Promise<Users> {
    const newUser = new this.userModel(User);
    return await newUser.save();
  }
  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }

  async update(User: CreateUserDto, id: string): Promise<Users> {
    const user = await this.findById(id);
    return await user.update(User);
  }
}
