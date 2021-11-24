import { v4 as uuid4 } from 'uuid';
import {BadRequestException, NotFoundException} from '../exceptions';
import { User } from '../entities';
import { postRepository } from '../repository';

class PostService {

  async createPost(user: User, content: string) {
    if (!content) {
      throw new BadRequestException('The content cannot be empty');
    } else {
      const id = uuid4();
      const userId = user.id;
      await postRepository.insert(id, userId, content);
    }
  }


  async findPostById(id: string) {
    const post = await postRepository.selectById(id);
    if (!post) throw new NotFoundException('The post was not found.');
    return post;
  }

}

export const postService = new PostService();
