import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsGmailEmail } from '../../../decorators/emailConfig.decorator';

export class RegisterUserDTO {
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @IsGmailEmail({
    message: 'Email must @gmail.com',
  })
  email: string;

  @MinLength(6, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;

  confirmPassword: string;
}
