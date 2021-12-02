import { v4 as uuid4 } from 'uuid';
import { BadRequestException, NotFoundException } from '../exceptions';
import { User } from '../entities';
import { postRepository } from '../repository';
import { promises as fs } from 'fs';

class PostService {

  // Creates a new post. Creating an empty post will not be possible.
  async createPost(user: User, content: string | undefined, file: Express.Multer.File | undefined) {
    if (!content && !file) {
      throw new BadRequestException('The post cannot be empty');
    } else {
      const id = uuid4();
      const userId = user.id;
      const filename = file?.filename;
      await postRepository.insert(id, userId, content, filename);
    }
  }

  // Returns a specific post selected by its id if found.
  async findPostById(id: string) {
    const post = await postRepository.selectById(id);
    if (!post) throw new NotFoundException('The post was not found.');
    return post;
  }

  // Returns max 10 most recent post according to lastDate.
  async findRecentPosts(lastDate: Date) {
    return await postRepository.selectRecent(lastDate);
  }

  // Deletes a specific post selected by its id. If post has a file, it will be deleted too.
  async deletePost(id: string) {
    const post = await postRepository.selectById(id);
    if (post?.filename) {
      await fs.rm(`uploads/${post.filename}`, { force: true });
    }
    await postRepository.delete(id);
  }

}

export const postService = new PostService();
