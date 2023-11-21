import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createUserService(user: any): Promise<any> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByIdService(_id: number): Promise<any> {
    try {
      return this.usersRepository.findOne({
        where: {
          _id,
        },
        relations: ['posts'],
      });
    } catch (error) {}
  }

  // lấy user theo email
  async getByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new HttpException("Can't get user", HttpStatus.BAD_REQUEST);
    }
  }
}
