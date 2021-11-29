import { db } from '../utils';
import { Comment } from '../entities';

class CommentRepository {

  async insert(id: string, postId: string, userId: string, content: string): Promise<void> {
    const query = 'insert into comments(id, postId, userId, content) values (?, ?, ?, ?)';
    await db.pool.query(query, [id, postId, userId, content]);
  }

  async selectById(id: string): Promise<Comment | undefined> {
    const query = 'select * from comments where id = ?';
    const result = await db.pool.query(query, [id]);
    if (result[0]) return new Comment(result[0]);
  }

  async delete(id: string): Promise<void> {
    console.log('commentRepository, delete, commentId:', id);
    const query = 'delete from comments where id = ?';
    await db.pool.query(query, [id]);
  }

}

export const commentRepository = new CommentRepository();