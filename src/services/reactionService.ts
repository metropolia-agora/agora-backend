import { Post, ReactionType, User } from '../entities';
import { reactionRepository } from '../repository/reactionRepository';
import { BadRequestException } from '../exceptions';

class ReactionService {

  async createReaction(postId: string, user: User, type: ReactionType): Promise<void> {
    if (!type) {
      throw new BadRequestException('reaction cannot be empty.');
    } else {
      const userId = user.id;
      await reactionRepository.insert(userId, postId, type);
    }
  }

  async findReactionByUserId(userId: string) {
    const reaction = await reactionRepository.selectByUserId(userId);
  }
  async findReactionByPostId(postId: string) {
    const reaction = await reactionRepository.selectByPostId(postId);
  }


}

export const reactionService = new ReactionService();