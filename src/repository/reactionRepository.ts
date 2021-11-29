import { db } from '../utils';
import { Reaction, ReactionType } from '../entities';

class ReactionRepository {

  async selectByUserId(userId: string) {
    const query = 'select * from reactions where userId  = ?';
    const result = await db.pool.query(query, [userId]);
    if (result[0]) return new Reaction(result[0]);
  }

  async selectByPostId(postId: string) {
    const query = 'select * from reactions where postId = ?';
    const result = await db.pool.query(query, [postId]);
    if (result[0]) return new Reaction(result[0]);
  }


  async insert(userId: string, postId: string, type: ReactionType): Promise<void> {
    const query = 'insert into reactions (userId, postId, type) values(?, ?, ?)';
    const values = [userId, postId, type];


  }

}

export const reactionRepository = new ReactionRepository();