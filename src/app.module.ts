import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './posts/post.module';
import { Post } from './posts/post.entity';
import { LikeModule } from './likes/like.module';
import { Like } from './likes/like.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      database: 'auth-test.sqlite',
      entities: [User, Post, Like],
      synchronize: true, // 개발환경에서만 사용
    }),
    PassportModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
