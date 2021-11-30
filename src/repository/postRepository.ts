import { db } from '../utils';
import { Post } from '../entities';

class PostRepository {

  async insert(id: string, userId: string, content?: string, filename?: string): Promise<void> {
    if (content && filename) {
      const query = 'insert into posts(id, userId, content, filename) values(?, ?, ?, ?)';
      await db.pool.query(query, [id, userId, content, filename]);
    } else if (filename) {
      const query = 'insert into posts(id, userId, filename) values(?, ?, ?)';
      await db.pool.query(query, [id, userId, filename]);
    } else if (content) {
      const query = 'insert into posts(id, userId, content) values(?, ?, ?)';
      await db.pool.query(query, [id, userId, filename]);
    }
  }

  async selectById(id: string): Promise<Post | undefined> {
    const query = 'select * from posts where id = ?';
    const result = await db.pool.query(query, [id]);
    if (result[0]) return new Post(result[0]);
  }

  async delete(id: string): Promise<void> {
    const query = 'delete from posts where id = ?';
    await db.pool.query(query, [id]);
  }

}

export const postRepository = new PostRepository();
