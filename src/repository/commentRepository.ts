import { db } from '../utils';
import { Comment } from '../entities';

class CommentRepository {

  async insert(id: string, postId: string, userId: string, content: string): Promise<void> {
    const query = 'insert into comments(id, postId, userId, content) values (?, ?, ?, ?)';
    await db.pool.query(query, [id, postId, userId, content]);
  }
}

export const commentRepository = new CommentRepository();