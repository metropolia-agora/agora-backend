import { v4 as uuid4 } from 'uuid';
import { BadRequestException, NotFoundException } from '../exceptions';
import { User } from '../entities';
import { postRepository } from '../repository';
import { promises as fs } from 'fs';

class PostService {

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

  async findPostById(id: string) {
    const post = await postRepository.selectById(id);
    if (!post) throw new NotFoundException('The post was not found.');
    return post;
  }

  async deletePost(id: string) {
    const post = await postRepository.selectById(id);
    if (post?.filename) {
      await fs.rm(`uploads/${post.filename}`, { force: true });
    }
    await postRepository.delete(id);
  }

}

export const postService = new PostService();
