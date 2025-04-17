import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostDto,
  GetPostsParams,
  GetPostParamResponse,
  UpdatePostDto,
  UserPostsQueryDto,
} from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(postDto: CreatePostDto) {
    return await this.postRepository.save(postDto);
  }
  async getPostsByUsername(
    userQuery: UserPostsQueryDto,
  ): Promise<GetPostParamResponse> {
    const { username, page = 1, limit = 10 } = userQuery;
    const skip = (page - 1) * limit;
    const [posts, totalPosts] = await this.postRepository.findAndCount({
      where: { username },
      select: ['id', 'username', 'createdAt', 'content', 'image'],
      order: { createdAt: 'DESC' }, // 최신 게시물 먼저
      skip,
      take: limit,
    });
    //전체 페이지수 계산
    const totalPages = Math.ceil(totalPosts / limit);
    return {
      posts,
      totalPages,
      currentPage: page,
    };
  }
  async getPostsWithParams(
    params: GetPostsParams,
  ): Promise<GetPostParamResponse> {
    const { currentPage, limit, category, sort } = params;
    // 페이지네이션을 위한 스킵 값 계산
    const skip = currentPage - 1 * limit;

    // 쿼리 빌더 생성
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // 카테고리 필터 적용(있는 경우)
    if (category) {
      queryBuilder.where('post.category = :category', {
        category,
      });
    }

    // 정렬 적용
    if (sort === 'latest') {
      queryBuilder.orderBy('post.createdAt', 'DESC');
    } else if (sort === 'popular') {
      queryBuilder.orderBy('post.likes', 'DESC');
    }

    // 페이지네이션 적용
    queryBuilder.skip(Number(skip)).take(Number(limit));

    // 쿼리 실행
    const [posts, totalCount] = await queryBuilder.getManyAndCount();

    console.log(posts.length);
    const [query, parameters] = queryBuilder.getQueryAndParameters();
    console.log('Query:', query);
    console.log('Parameters:', parameters);
    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalCount / limit);
    return {
      posts,
      totalPages,
      currentPage,
    };
  }
  async getOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }
  async getAll(): Promise<Post[]> {
    return await this.postRepository.find({});
  }
  async update(id: number, updatePost: UpdatePostDto) {
    const post = await this.getOne(id);
    //내용

    post.content = updatePost.content;
    post.category = updatePost.category;
    post.likes += 1;

    return await this.postRepository.save(post);
  }
  async delete(id: number) {
    return await this.postRepository.delete({ id });
  }
}
