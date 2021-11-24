import { db } from '../utils';
import {Post} from '../entities';

class PostRepository {

  async insert(id: string, userId: string, content: string): Promise<void> {
    const query = 'insert into posts(id, userId, content) values(?, ?, ?)';
    await db.pool.query(query, [id, userId, content]);
  }

  async selectById(id: string): Promise<Post | undefined> {
    const query = 'select * from posts where id = ?';
    const result = await db.pool.query(query, [id]);
    if (result[0]) return new Post(result[0]);
  }

}

export const postRepository = new PostRepository();
