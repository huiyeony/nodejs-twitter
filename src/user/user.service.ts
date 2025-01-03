import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async createUser(user: CreateUserDto): Promise<User> {
    const _user = await this.getUser(user.email);
    if (_user) {
      throw new HttpException('이미 존재하는 유저입니다', 403);
    }

    return await this.repository.save(user);
  }
  async updateUser(email, _user: UpdateUserDto): Promise<User> {
    const user = await this.getUser(email);
    //username, password 수정
    user.username = _user.username;
    user.password = _user.password;

    return await this.repository.save(user);
  }
  async getUser(email): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }
  async deleteUser(email) {
    return await this.repository.delete({ email });
  }
}
