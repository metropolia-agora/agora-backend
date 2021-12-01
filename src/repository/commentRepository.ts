import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Comment } from '../entities';
import { db } from '../utils';

class CommentRepository {

  async selectById(id: string): Promise<Comment | undefined> {
    const query = 'select * from comments where id = ?';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows[0]) return new Comment(rows[0] as Comment);
  }

  async selectAllByPostId(postId: string): Promise<Comment[] | undefined> {
    const query = 'select * from comments where postId = ?';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [postId]);
    return rows.map(comment => new Comment(comment as Comment));
  }

  async insert(id: string, postId: string, userId: string, content: string): Promise<void> {
    const query = 'insert into comments(id, postId, userId, content) values (?, ?, ?, ?)';
    await db.pool.execute<ResultSetHeader>(query, [id, postId, userId, content]);
  }

  async delete(id: string): Promise<void> {
    const query = 'delete from comments where id = ?';
    await db.pool.execute<ResultSetHeader>(query, [id]);
  }

}

export const commentRepository = new CommentRepository();
