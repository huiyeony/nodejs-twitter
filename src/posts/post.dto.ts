import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Post } from './post.entity';
export class UserPostsQueryDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number;
}
export class GetPostsParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  currentPage: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
  @IsString()
  category: string;
  @IsString()
  sort: 'latest' | 'popular';
}
export class GetPostParamResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

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
  title: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  category: string;
  @IsNumber()
  likes: number;
  @IsNumber()
  comments: number;
  @IsString()
  @IsNotEmpty()
  content: string;
}
