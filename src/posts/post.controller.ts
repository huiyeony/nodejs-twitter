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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/')
  @UseGuards(AuthGuard())
  async getPosts(
    @Query('currentPage') currentPage: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category: string,
    @Query('sort') sort: 'latest' | 'popular' = 'latest',
    @Req() req,
  ) {
    console.log(req.user.userId);
    return await this.postService.getPosts({
      userId: req.user.userId,
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
