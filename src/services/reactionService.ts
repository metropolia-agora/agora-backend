import { ReactionType, User } from '../entities';
import { reactionRepository } from '../repository/reactionRepository';
import { BadRequestException, NotFoundException } from '../exceptions';

class ReactionService {

  async createReaction(postId: string, user: User, type: ReactionType): Promise<void> {
    if (!type) {
      throw new BadRequestException('reaction cannot be empty.');
    } else {
      const userId = user.id;
      await reactionRepository.insert(userId, postId, type);
    }
  }

  async findReactionByPostId(postId: string) {
    const reaction = await reactionRepository.selectByPostId(postId);
    if (!reaction) throw new NotFoundException('The reaction was not found.');
    return reaction;
  }


}


export const reactionService = new ReactionService();
