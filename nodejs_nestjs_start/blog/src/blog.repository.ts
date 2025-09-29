import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto | undefined | null>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async createPost(postDto: PostDto) {
    const createPost: PostDto = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto | undefined | null> {
    return await this.blogModel.findById(id);
  }

  async deletePost(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { ...postDto, updatedDt: new Date() };
    await this.blogModel.findByIdAndDelete(id, updatePost);
  }
}
