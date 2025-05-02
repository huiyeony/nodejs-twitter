import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}
  async likePost(userId, postId): Promise<void> {
    const liked = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    //새로운 한 쌍을 추가
    if (!liked) {
      await this.likeRepository.save({ userId, postId });
    }
  }
  async unlikePost(userId, postId): Promise<void> {
    await this.likeRepository.delete({ userId, postId });
  }
  async isLiked(userId, postId): Promise<boolean> {
    const liked = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    return !!liked;
  }
  async countLikes(postId) {
    return await this.likeRepository.count({ where: { postId } });
  }
}
