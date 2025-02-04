import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  image: string | null;
}
export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
