import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req, @Response() res) {
    //로그인이 성공시 세션이 자동으로 생성됩니다
    req.session.save(() => {
      // 명시적으로 쿠키 설정
      res.cookie('connect.sid', req.sessionID, {
        httpOnly: true,
        maxAge: 3600000,
        secure: false,
        sameSite: 'lax',
      });
      res.send({ user: req.user, message: '로그인 성공' });
    });
  }
  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  profile(@Request() req, @Response() res) {
    console.log('로그인 성공, 사용자:', req.user);
    console.log('세션 ID:', req.sessionID);
    console.log('세션 내용:', req.session);
    res.send({ user: req.user });
  }
  @Post('logout')
  logout(@Request() req, @Response() res) {
    res.clearCookie('connect.sid'); // 기본  쿠키 이름
    res.send({ message: '로그아웃 성공' });
  }
}
