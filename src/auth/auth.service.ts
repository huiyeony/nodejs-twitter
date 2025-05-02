import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email, password) {
    //존재하는 유저
    const user = await this.userService.getUser(email);
    if (!user) return null;
    //일치하는 비밀번호
    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) return null;

    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload); //문자열 반환
  }
  async register(email, password, username) {
    //이미 존재하는 유저인지
    const user = await this.userService.getUser({ email });
    if (user) throw new ConflictException('이미 존재하는 유저');

    const bcryptPwd = await bcrypt.hash(password, 10);
    //새로운 유저
    const newUser = await this.userService.createUser({
      username,
      email,
      password: bcryptPwd,
    });
    //바로 로그인
    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token: this.jwtService.sign({ username, email }),
    };
  }
}
