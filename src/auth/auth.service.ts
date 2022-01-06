import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (!candidate) {
      throw new HttpException(
        'Пользователь с такой почтой не найден',
        HttpStatus.NOT_FOUND,
      );
    }

    const areSame = userDto.password === candidate.password;

    if (!areSame) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    return this.generateToken(candidate);
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (user) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidate = await this.userService.createUser(userDto);

    return this.generateToken(candidate);
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
