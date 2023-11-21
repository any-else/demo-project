import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerData: any) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    try {
      await this.userService.createUserService({
        ...registerData,
        password: hashedPassword,
      });
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(infoUser: LoginDto): Promise<any> {
    try {
      const user = await this.userService.getByEmail(infoUser.email);
      const isMatch = await bcrypt.compare(infoUser.password, user.password);
      if (!isMatch || !user) {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }
      const token = await this.createToken(user);
      console.log('token', token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return {
        user: rest,
        accsets_token: token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }

  async createToken(user: any): Promise<any> {
    console.log('user', user);
    const payload = {
      email: user.email,
      sub: user._id.toString(),
    };
    return await this.jwtService.signAsync(payload);
  }
}
