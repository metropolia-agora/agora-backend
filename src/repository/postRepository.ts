import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Post } from '../entities';
import { db } from '../utils';

class PostRepository {

  async selectById(id: string): Promise<Post | undefined> {
    const query = 'select * from posts where id = ?';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) return new Post(rows[0] as Post);
  }

  async insert(id: string, userId: string, content?: string, filename?: string): Promise<void> {
    const query = 'insert into posts(id, userId, content, filename) values(?, ?, ?, ?)';
    await db.pool.execute<ResultSetHeader>(query, [id, userId, content || null, filename || null]);
  }

  async delete(id: string): Promise<void> {
    const query = 'delete from posts where id = ?';
    await db.pool.execute<ResultSetHeader>(query, [id]);
  }

}

export const postRepository = new PostRepository();
