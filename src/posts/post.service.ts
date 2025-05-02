import { LikeService } from './../likes/like.service';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePostDto,
  GetPostsParams,
  GetPostParamResponse,
  UpdatePostDto,
  UserPostsQueryDto,
} from './post.dto';
import { Like } from 'src/likes/like.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
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
  async getPosts({ userId, currentPage, limit, category, sort }) {
    // 쿼리 생성
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    // 카테코리 쿼리 수행
    if (category) {
      queryBuilder.where('post.category = :category', {
        category,
      });
    }

    // 데이터 정렬
    if (sort === 'latest') {
      queryBuilder.orderBy('post.createdAt', 'DESC');
    } else if (sort === 'popular') {
      queryBuilder.orderBy('post.likes', 'DESC');
    }
    // 스킵 값 계산
    const skip = currentPage - 1 * limit;
    // 스킵 쿼리 수행
    queryBuilder.skip(Number(skip)).take(Number(limit));

    // 쿼리 데이터 반환
    const [posts, totalCount] = await queryBuilder.getManyAndCount();

    const postIds = posts.map((post) => post.id);
    const likedList = await this.likeRepository.find({
      where: { userId, postId: In(postIds) },
      select: ['postId'],
    });
    const likedMap = new Set(likedList.map((like) => like.postId));
    const postsWithIsLiked = posts.map((post) => ({
      ...post,
      isLiked: likedMap.has(post.id),
    }));

    return {
      posts: postsWithIsLiked,
      totalPages: Math.ceil(totalCount / limit),
      currentPage,
    };
  }
  //id 게시글 불러오기
  async getOne(id: number): Promise<Post> {
    return await this.postRepository.findOne({ where: { id } });
  }
  //모든 게시글 불러오기
  async getAll(): Promise<Post[]> {
    return await this.postRepository.find({});
  }
  //게시글 변경
  async update(id: number, updatePost: UpdatePostDto) {
    const post = await this.getOne(id);
    //내용

    post.content = updatePost.content;
    post.category = updatePost.category;
    post.likes += 1;

    return await this.postRepository.save(post);
  }
  //게시글 삭제
  async delete(id: number) {
    return await this.postRepository.delete({ id });
  }
}
