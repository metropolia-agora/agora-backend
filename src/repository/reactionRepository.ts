import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Reaction, ReactionType } from '../entities';
import { db } from '../utils';

class ReactionRepository {

  async select(postId: string, userId: string) {
    const query = 'select * from reactions where postId = ? and userId = ?';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [postId, userId]);
    if (rows[0]) return new Reaction(rows[0] as Reaction);
  }

  async update(userId: string, postId: string, type: ReactionType): Promise<void> {
    const query = 'update reactions set type = ? where userId = ? and postId = ?';
    await db.pool.execute<ResultSetHeader>(query,[type, userId, postId]);
  }

  async insert(userId: string, postId: string, type: ReactionType): Promise<void> {
    const query = 'insert into reactions (userId, postId, type) values(?, ?, ?)';

    await db.pool.execute<ResultSetHeader>(query,[userId, postId, type]);
  }

}

export const reactionRepository = new ReactionRepository();
