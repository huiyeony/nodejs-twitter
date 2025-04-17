import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<any> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); //세션 저장
    console.log(`LocalAuthGuard result:`, result);
    return result;
  }
}
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('로그인 성공, 사용자:', req.user);
    console.log('세션 ID:', req.sessionID);
    console.log('세션 내용:', req.session.passport);
    try {
      const isAuth = req.isAuthenticated();
      console.log('인증 결과:', isAuth);
      return isAuth;
    } catch (error) {
      console.error('인증 과정에서 오류 발생:', error);
      return false; // Or handle the error differently
    } //세션에서 정보를 읽어서 인증확인
  }
}
