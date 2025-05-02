import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { Like } from './like.entity';
import { LikeController } from './like.controller';
import { PassportModule } from '@nestjs/passport';

// src/likes/likes.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [LikeService],
  controllers: [LikeController],
  exports: [LikeService, LikeModule],
})
export class LikeModule {}
