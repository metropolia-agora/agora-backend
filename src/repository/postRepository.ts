import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Post } from '../entities';
import { db } from '../utils';

class PostRepository {

  // Selects the specifically wanted post by its id if found.
  async selectById(id: string): Promise<Post | undefined> {
    const query = `
      select
        p.*,
        u.id as ownerId, u.username as ownerUsername, u.filename as ownerFilename,
        (select count(c.id) from comments c where c.postId = p.id) as commentCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = 1) as upvoteCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = -1) as downvoteCount
      from posts p
        left outer join users u on u.id = p.userId
      where p.id = ?;
    `;
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) return new Post(rows[0] as Post);
  }

  // Selects max 10 most recent posts. Where post's createdAt < lastDate.
  async selectRecent(lastDate: Date): Promise<Post[]> {
    const query = `
      select
        p.*,
        u.id as ownerId, u.username as ownerUsername, u.filename as ownerFilename,
        (select count(c.id) from comments c where c.postId = p.id) as commentCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = 1) as upvoteCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = -1) as downvoteCount
      from posts p
        left outer join users u on u.id = p.userId
      where p.createdAt < ? order by p.createdAt desc limit 10;
    `;
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [lastDate]);
    return rows.map(post => new Post(post as Post));
  }

  // Adds a new posts to posts table.
  async insert(id: string, userId: string, content?: string, filename?: string): Promise<void> {
    const query = 'insert into posts(id, userId, content, filename) values(?, ?, ?, ?)';
    await db.pool.execute<ResultSetHeader>(query, [id, userId, content || null, filename || null]);
  }

  // Deletes the specifically wanted post by its id.
  async delete(id: string): Promise<void> {
    const query = 'delete from posts where id = ?';
    await db.pool.execute<ResultSetHeader>(query, [id]);
  }

}

export const postRepository = new PostRepository();
