import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { PostModule } from './posts/post.module';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      database: 'auth-test.sqlite',
      entities: [User, Post],
      synchronize: true, // 개발환경에서만 사용
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
