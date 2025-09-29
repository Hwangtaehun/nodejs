import { PostDto } from './blog.model';

export class BlogService {
  private posts: PostDto[] = [];

  getAllPosts(): PostDto[] {
    return this.posts;
  }

  createPost(postData: Omit<PostDto, 'id' | 'createdDt' | 'updatedDt'>): PostDto {
    const id = (this.posts.length + 1).toString();
    const newPost: PostDto = {
      id,
      ...postData,
      createdDt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  getPost(id: string): PostDto | undefined {
    return this.posts.find((post) => post.id === id);
  }

  delete(id: string): void {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  updatePost(id: string, postData: Omit<PostDto, 'id' | 'createdDt'>): PostDto | undefined {
    const updateIndex = this.posts.findIndex((post) => post.id === id);
    if (updateIndex === -1) return undefined;

    const updatePost: PostDto = {
      ...this.posts[updateIndex],
      ...postData,
      updatedDt: new Date(),
    };

    this.posts[updateIndex] = updatePost;
    return updatePost;
  }
}