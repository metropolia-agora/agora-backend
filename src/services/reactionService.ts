import { ReactionType, User } from '../entities';
import { NotFoundException } from '../exceptions';
import { reactionRepository } from '../repository';

class ReactionService {

  async createReaction(postId: string, user: User, type: ReactionType): Promise<void> {
    const userId = user.id;
    const reaction = await reactionRepository.select(postId, userId);
    if (reaction) {
      await reactionRepository.update(userId, postId, type);
    } else {
      await reactionRepository.insert(userId, postId, type);
    }
  }

  async findReaction(postId: string, userId: string){
    const reaction = await reactionRepository.select(postId, userId);
    if (!reaction) throw new NotFoundException('The reaction was not found.');
    return reaction;
  }

  async deleteReaction(postId: string, userId: string): Promise<void> {
    await reactionRepository.delete(userId, postId);
  }

}

export const reactionService = new ReactionService();
