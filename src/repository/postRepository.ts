import { db } from '../utils';

class PostRepository {

  async insert(id: string, userId: string, content: string): Promise<void> {
    const query = 'insert into posts(id, userId, content) values(?, ?, ?)';
    await db.pool.query(query, [id, userId, content]);
  }

}

export const postRepository = new PostRepository();
