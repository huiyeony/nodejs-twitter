import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //사용자의 '인증' 기능담당
    const request = context.switchToHttp().getRequest();

    if (request.cookies['login']) {
      console.log(request.cookies['login']);
      return true;
    }
    //쿠키가 없으면 인증 시도
    if (!request.body.email || !request.body.password) {
      return false;
    }
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );
    //유저가 존재하지 않음
    if (!user) {
      console.log(`존재하지 않는 유저`);
      return false;
    }
    request.user = user;
    return true;
  }
}
