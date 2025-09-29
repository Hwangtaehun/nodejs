import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';

export interface BlogRepository {
  getAllPost(): Promise<PostDto[]>;
  createPost(
    postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>,
  ): Promise<PostDto>;
  getPost(id: string): Promise<PostDto | undefined>;
  deletePost(id: string): Promise<void>;
  updatePost(
    id: string,
    postDto: Omit<PostDto, 'id' | 'createdDt'>,
  ): Promise<PostDto | undefined>;
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
  FILE_NAME = './src/blog.data.json';

  async getAllPost(): Promise<PostDto[]> {
    const datas = await readFile(this.FILE_NAME, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const posts: PostDto[] = JSON.parse(datas);
    return posts;
  }

  async createPost(
    postDto: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>,
  ): Promise<PostDto> {
    const posts = await this.getAllPost();
    const id = (posts.length + 1).toString();
    const createPost: PostDto = {
      id,
      ...postDto,
      createdDt: new Date(),
    };
    posts.push(createPost);
    await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
    return createPost;
  }

  async getPost(id: string): Promise<PostDto | undefined> {
    const posts = await this.getAllPost();
    return posts.find((post) => post.id === id);
  }

  async deletePost(id: string): Promise<void> {
    const posts = await this.getAllPost();
    const filteredPosts = posts.filter((post) => post.id !== id);
    await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts, null, 2));
  }

  async updatePost(
    id: string,
    postDto: Omit<PostDto, 'id' | 'createdDt'>,
  ): Promise<PostDto | undefined> {
    const posts = await this.getAllPost();
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) return undefined;

    const updatePost: PostDto = {
      ...posts[index],
      ...postDto,
      updatedDt: new Date(),
    };
    posts[index] = updatePost;
    await writeFile(this.FILE_NAME, JSON.stringify(posts, null, 2));
    return updatePost;
  }
}
