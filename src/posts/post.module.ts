import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Like } from 'src/likes/like.entity';
import { S3Service } from './s3.service';
import { LikeModule } from 'src/likes/like.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Like]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LikeModule,
  ],
  controllers: [PostController],
  providers: [PostService, ConfigService, S3Service],
})
export class PostModule {}
