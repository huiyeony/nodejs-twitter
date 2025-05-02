import { AuthGuard } from '@nestjs/passport';
import { LikeService } from './like.service';
import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

@Controller('/likes')
export class LikeController {
  constructor(private readonly LikeService: LikeService) {}
  @Post('/')
  @UseGuards(AuthGuard)
  async like(@Param('postId') postId, @Req() req) {
    const userId = req.user.id; // JWT 인증 후 user.id 존재한다고 가정
    await this.LikeService.likePost(userId, postId);
    return { success: true };
  }
  @Post('/')
  @UseGuards(AuthGuard)
  async unlike(@Param('postId') postId, @Req() req) {
    const userId = req.user.id;
    await this.LikeService.unlikePost(userId, postId);
    return { success: true };
  }
}
