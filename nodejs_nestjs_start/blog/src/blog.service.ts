import { Injectable } from '@nestjs/common';
import { PostDto } from './blog.model';
import { BlogFileRepository, BlogRepository } from './blog.repository';

export class BlogService {
  //private posts: PostDto[] = [];
  blogRespository: BlogRepository;

  constructor() {
    this.blogRespository = new BlogFileRepository();
  }

  async getAllPosts() {
    return await this.blogRespository.getAllPost();
  }

  createPost(postDto: PostDto) {
    this.blogRespository.createPost(postDto);
  }

  async getPost(id: string): Promise<PostDto | undefined> {
    return await this.blogRespository.getPost(id);
  }

  delete(id: string): void {
    this.blogRespository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRespository.updatePost(id, postDto);
  }
}
