import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async register(user: CreateUserDto): Promise<User> {
    const _user = await this.userService.getUser(user.email);
    console.log(_user);
    //이미 가입된 유저
    if (_user) {
      //message, status
      throw new HttpException('이미 존재하는 유저입니다', 403);
    }
    const encryped = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userService.createUser({
      ...user,
      password: encryped,
    });
    newUser.password = undefined;
    return newUser;
  }
  async validateUser(email: string, password: string): Promise<User> {
    //이메일과 패스워드를 맞게 입력했는지 테스트
    const user = await this.userService.getUser(email);

    if (!user) {
      return null;
    }
    const { password: encrypedPassword, ...userInfo } = user;
    if (bcrypt.compareSync(password, encrypedPassword)) {
      return user;
    }
    return null;
  }
}
