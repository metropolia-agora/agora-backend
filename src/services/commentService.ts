import { v4 as uuid4 } from 'uuid';
import { Comment, User } from '../entities';
import { BadRequestException, NotFoundException } from '../exceptions';
import { commentRepository } from '../repository';

class CommentService {

  // Find a comment by its id
  async findCommentById(id: string): Promise<Comment> {
    const comment = await commentRepository.selectById(id);
    if (!comment) throw new NotFoundException('The comment was not found.');
    return comment;
  }

  // Find many comments by their post id
  async findCommentsByPostId(postId: string): Promise<Comment[]> {
    return await commentRepository.selectAllByPostId(postId);
  }

  // Create a new comment
  async createComment(postId: string, user: User, content: string): Promise<Comment> {
    if (!content) {
      throw new BadRequestException('Comment cannot be empty.');
    } else {
      const id = uuid4();
      const userId = user.id;
      await commentRepository.insert(id, postId, userId, content);
      const comment = await commentRepository.selectById(id);
      return comment as Comment;
    }
  }

  // Delete an existing comment
  async deleteComment(id: string): Promise<void> {
    await commentRepository.delete(id);
  }

}

export const commentService = new CommentService();
