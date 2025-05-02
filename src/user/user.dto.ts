import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
export class UpdateUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
