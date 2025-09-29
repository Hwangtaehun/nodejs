import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogFileRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto | undefined | null> {
    return await this.blogRepository.getPost(id);
  }

  delete(id: string): void {
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}
