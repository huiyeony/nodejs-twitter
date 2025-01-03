import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(postDto: CreatePostDto) {
    return await this.postRepository.save(postDto);
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
