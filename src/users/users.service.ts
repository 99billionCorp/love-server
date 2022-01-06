import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne<User>({
      where: {
        email,
      },
    });
  }
}
