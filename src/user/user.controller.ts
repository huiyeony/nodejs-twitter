import { UserService } from './user.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    this.userService.createUser(user);
  }
  @Get('/get/:email')
  async getUser(@Param('email') email) {
    return await this.userService.getUser(email);
  }
  @Put('/update/:email')
  async updateUser(@Param('email') email, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(email, user);
  }
  @Delete('/delete/:email')
  async deleteUser(@Param('email') email: string) {
    return await this.userService.deleteUser(email);
  }
}
