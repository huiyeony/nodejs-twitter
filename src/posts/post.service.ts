import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostDto,
  PaginationQueryDto,
  PaginationResponseDto,
  UpdatePostDto,
} from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(postDto: CreatePostDto) {
    return await this.postRepository.save(postDto);
  }
  async getPosts(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginationResponseDto> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
    // 게시물과 총 개수를 함께 가져옴
    const [posts, totalPosts] = await this.postRepository.findAndCount({
      select: ['id', 'username', 'createdAt', 'content', 'image'],
      order: { createdAt: 'DESC' }, // 최신 게시물 먼저
      skip,
      take: limit,
    });
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalPosts / limit);
    return {
      posts,
      totalPosts,
      totalPages,
      currentPage: page,
    };
  }
  async getOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }
  async getAll(): Promise<Post[]> {
    return await this.postRepository.find({});
  }
  async update(id: number, _post: UpdatePostDto) {
    const post = await this.getOne(id);
    //내용

    post.content = _post.content;
    return await this.postRepository.save(post);
  }
  async delete(id: number) {
    return await this.postRepository.delete({ id });
  }
}
