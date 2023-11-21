import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './autth.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterUserDTO) {
    if (registerData.password !== registerData.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = registerData;
    return this.authService.register(rest);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginBody: LoginDto) {
    return this.authService.login(loginBody);
  }
}
