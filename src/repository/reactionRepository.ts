import { db } from '../utils';
import { Reaction, ReactionType } from '../entities';

class ReactionRepository {


  async selectByPostId(postId: string) {
    const query = 'select * from reactions where postId = ?';
    const result = await db.pool.query(query, [postId]);
    if (result[0]) return new Reaction(result[0]);
  }


  async insert(userId: string, postId: string, type: ReactionType): Promise<void> {
    const query = 'insert into reactions (userId, postId, type) values(?, ?, ?)';
    await  db.pool.query(query,[userId, postId, type]);


  }

}

export const reactionRepository = new ReactionRepository();