import { CreatePostDto, UpdatePostDto } from './post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(`/newer`)
  async getNewerPosts(
    @Query(`latestId`) latestId: number | null,
    @Query(`limit`) limit: number | null,
  ) {
    if (!limit) limit = 20;

    return this.postService.getNewerPosts(latestId, limit);
  }
  @Get(`/initial`)
  async getInitialPosts(@Query(`limit`) limit: number | null) {
    return this.postService.getInitialPosts(limit);
  }
  @Post(`/:id/like`)
  async toggleLiked(@Param('id') id: number) {
    //return await this.postService.toggleLiked()
  }
  @Post('/create')
  async create(@Body() postDto: CreatePostDto) {
    return await this.postService.create(postDto);
  }
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.postService.getOne(id);
  }
  @Get('/')
  async getAll() {
    return await this.postService.getAll();
  }
  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateDto: UpdatePostDto) {
    return await this.postService.update(id, updateDto);
  }
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.postService.delete(id);
  }
}
