import { v4 as uuid4 } from 'uuid';
import { BadRequestException } from '../exceptions';
import { Post, User } from '../entities';
import { commentRepository } from '../repository';

class CommentService {

  async createComment(postId: string, user: User, content: string) {
    if (!content) {
      throw new BadRequestException('Comment cannot be empty.');
    } else {
      const id = uuid4();
      const userId = user.id;
      await commentRepository.insert(id, postId, userId, content);
    }
  }
}

export const commentService = new CommentService();