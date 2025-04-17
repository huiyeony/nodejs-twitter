import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (error: Error, user: any) => void) {
    //user.email 만 저장
    console.log(`serializerUser : ${user}`);
    done(null, user.email);
  }
  async deserializeUser(
    payload: any,
    done: (error: Error, payload: any) => void,
  ): Promise<any> {
    try {
      console.log(`deserializeUser : ${payload}`);
      const user = await this.userService.getUser(payload);
      if (!user) {
        throw new Error('No User');
      }
      done(null, user); //strategy 에게 넘겨줌
    } catch (error) {
      done(error, null);
    }
  }
}
