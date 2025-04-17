import { S3Service } from './s3.service';
import { CreatePostDto, GetPostsParams, UpdatePostDto } from './post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('/image/upload')
  @UseInterceptors(FileInterceptor(`image`))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.s3Service.uploadFile(file); //
  }
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() postDto: CreatePostDto,
  ) {
    if (file) {
      const image = await this.upload(file);
      return await this.postService.create({ ...postDto, image });
    }
    return await this.postService.create(postDto);
  }
  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return await this.postService.getOne(id);
  }
  //url 파라미터 방식
  @Get('user/:username')
  async getPostsByUsername(
    @Param('username') username: string,
    @Query() params: GetPostsParams,
  ) {
    return this.postService.getPostsByUsername({
      username,
      page: params.currentPage,
      limit: params.limit,
    });
  }
  @Get('/')
  async getPostsWithParams(
    @Query('currentPage') currentPage: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category: string,
    @Query('sort') sort: 'latest' | 'popular' = 'latest',
  ) {
    return await this.postService.getPostsWithParams({
      currentPage,
      limit,
      category,
      sort,
    });
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() updateDto: UpdatePostDto) {
    console.log(updateDto);
    return await this.postService.update(id, updateDto);
  }
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.postService.delete(id);
  }
}
