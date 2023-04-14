import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  avatar: string;

  @IsEnum(['admin_role', 'user_role'])
  role: string;
}
