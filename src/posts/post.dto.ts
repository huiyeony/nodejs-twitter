import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  // @IsString()
  // @IsNotEmpty()
  // handle: string;
}
export class UpdatePostDto {
  // @IsString()
  // @IsNotEmpty()
  // title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
