import { db } from '../utils';
import { Reaction, ReactionType } from '../entities';

class ReactionRepository {

  async insert(userId: string, postId: string, type: number): Promise<void> {
    const query = 'insert into reactions (userId, postId, type) values(?, ?, ?)';
    await  db.pool.query(query,[userId, postId, type]);

  }

  async selectByPostId(postId: string) {
    const query = 'select * from reactions where postId = ?';
    const result = await db.pool.query(query, [postId]);
    if (result[0]) return new Reaction(result[0]);
  }


}

export const reactionRepository = new ReactionRepository();