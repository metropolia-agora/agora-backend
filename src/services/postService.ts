import { v4 as uuid4 } from 'uuid';
import { promises as fs } from 'fs';
import { BadRequestException, NotFoundException } from '../exceptions';
import { Post, User } from '../entities';
import { postRepository } from '../repository';

class PostService {

  // Returns a specific post selected by its id if found.
  async findPostById(id: string, checkReactionsForUserId?: string) {
    const post = await postRepository.selectById(id, checkReactionsForUserId);
    if (!post) throw new NotFoundException('The post was not found.');
    return post;
  }

  // Returns max 10 most recent post according to lastDate.
  async findRecentPosts(lastDate: Date, checkReactionsForUserId?: string) {
    return await postRepository.selectRecent(lastDate, checkReactionsForUserId);
  }

  // Returns all posts selected by its user's id if found.
  async findPostsByUserId(id: string, checkReactionsForUserId?: string) {
    return await postRepository.selectByUserId(id, checkReactionsForUserId);
  }

  // Creates a new post. Creating an empty post will not be possible.
  async createPost(user: User, content?: string, file?: Express.Multer.File) {
    if (!content && !file) {
      throw new BadRequestException('The post cannot be empty');
    } else {
      const id = uuid4();
      const userId = user.id;
      const filename = file?.filename;
      await postRepository.insert(id, userId, content, filename);
    }
  }

  // Deletes a specific post selected by its id. If post has a file, it will be deleted too.
  async deletePost(post: Post) {
    if (post?.filename) {
      await fs.rm(`uploads/${post.filename}`, { force: true });
    }
    await postRepository.delete(post.id);
  }

}

export const postService = new PostService();
