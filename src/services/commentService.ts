import { v4 as uuid4 } from 'uuid';
import { BadRequestException, NotFoundException } from '../exceptions';
import { User } from '../entities';
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

  async findCommentById(id: string) {
    const comment = await commentRepository.selectById(id);
    if (!comment) throw new NotFoundException('The comment was not found.');
    return comment;
  }

  async deleteComment(id: string) {
    await commentRepository.delete(id);
  }

}

export const commentService = new CommentService();