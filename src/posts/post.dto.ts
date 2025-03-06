import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Post } from './post.entity';
export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number = 10;
}
export class PaginationResponseDto {
  posts: Post[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}
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
