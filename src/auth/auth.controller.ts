import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.validateUser(
      body.email,
      body.password,
    );
    //존재하지 않거나 비밀번호가 다르면 null 리턴함
    if (!token) {
      throw new UnauthorizedException('Invalid user');
    }
    return { token };
  }
  @Post('/register')
  async register(
    @Body() body: { email: string; password: string; username: string },
  ) {
    return await this.authService.register(
      body.email,
      body.password,
      body.username,
    );
  }
}
