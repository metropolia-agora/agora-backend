import { db } from '../utils';
import {Post} from '../entities';

class PostRepository {

  async insert(id: string, userId: string, content?: string, filename?: string, mimetype?: string): Promise<void> {
    let query = 'insert into posts(id, userId, content, filename, mimetype) values(?, ?, ?, ?, ?)';
    let values = [id, userId, content, filename, mimetype];

    if (!content) {
      query = 'insert into posts(id, userId, filename, mimetype) values(?, ?, ?, ?)';
      values = [id, userId, filename, mimetype];
    }
    if (!mimetype) {
      query = 'insert into posts(id, userId, content) values(?, ?, ?)';
      values = [id, userId, content];
    }

    await db.pool.query(query, values);
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
