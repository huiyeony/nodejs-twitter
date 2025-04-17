import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://wssheep.up.railway.app'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000, // 1시간
      },
    }),
  );

  // Passport 초기화 및 세션 사용
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
