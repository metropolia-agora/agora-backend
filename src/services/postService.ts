import { v4 as uuid4 } from 'uuid';
import { BadRequestException } from '../exceptions';
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

}

export const postService = new PostService();
