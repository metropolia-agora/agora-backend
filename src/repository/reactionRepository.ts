import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Reaction, ReactionType } from '../entities';
import { db } from '../utils';

class ReactionRepository {

  async selectByPostId(postId: string) {
    const query = 'select * from reactions where postId = ?';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [postId]);
    if (rows[0]) return new Reaction(rows[0] as Reaction);
  }

  async insert(userId: string, postId: string, type: ReactionType): Promise<void> {
    const query = 'insert into reactions (userId, postId, type) values(?, ?, ?)';

    await db.pool.execute<ResultSetHeader>(query,[userId, postId, type]);
  }

}

export const reactionRepository = new ReactionRepository();
