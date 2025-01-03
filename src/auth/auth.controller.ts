import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
  @Post('/login')
  @UseGuards(LoginGuard)
  login(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
    }
    console.log('login request received');
    res.send({ user: req.user });
  }

  @Post('/test-guard')
  @UseGuards(LoginGuard)
  test(@Request() req, @Response() res) {
    res.json({
      message: '로그인이 성공하면 보입니다',
    });
  }
}
