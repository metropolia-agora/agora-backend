import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Post } from '../entities';
import { db } from '../utils';

class PostRepository {

  // Select a single post by post id
  async selectById(id: string, checkReactionsForUserId?: string): Promise<Post | undefined> {
    const query = `
      select
        p.*,
        u.id as ownerId, u.username as ownerUsername, u.filename as ownerFilename,
        (select count(c.id) from comments c where c.postId = p.id) as commentCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = 1) as upvoteCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = -1) as downvoteCount,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = 1) as hasUpvoted,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = -1) as hasDownvoted
      from posts p
        left outer join users u on u.id = p.userId
      where p.id = ?;
    `;
    const values = [checkReactionsForUserId || null, checkReactionsForUserId || null, id];
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, values);
    if (rows.length > 0) return new Post(rows[0] as Post);
  }

  // Select all posts by user id
  async selectByUserId(userId: string, checkReactionsForUserId?: string): Promise<Post[]> {
    const query = `
      select
        p.*,
        u.id as ownerId, u.username as ownerUsername, u.filename as ownerFilename,
        (select count(c.id) from comments c where c.postId = p.id) as commentCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = 1) as upvoteCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = -1) as downvoteCount,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = 1) as hasUpvoted,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = -1) as hasDownvoted
      from posts p
        left outer join users u on u.id = p.userId
      where p.userId = ?;
    `;
    const values = [checkReactionsForUserId || null, checkReactionsForUserId || null, userId];
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, values);
    return rows.map(post => new Post(post as Post));
  }

  // Select the 10 most recent posts, where the post's createdAt < lastDate.
  async selectRecent(lastDate: Date, checkReactionsForUserId?: string): Promise<Post[]> {
    const query = `
      select
        p.*,
        u.id as ownerId, u.username as ownerUsername, u.filename as ownerFilename,
        (select count(c.id) from comments c where c.postId = p.id) as commentCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = 1) as upvoteCount,
        (select count(r.postId) from reactions r where r.postId = p.id and r.type = -1) as downvoteCount,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = 1) as hasUpvoted,
        exists(select r.postId from reactions r where r.postId = p.id and r.userId = ? and r.type = -1) as hasDownvoted
      from posts p
        left outer join users u on u.id = p.userId
      where p.createdAt < ? order by p.createdAt desc limit 10;
    `;
    const values = [checkReactionsForUserId || null, checkReactionsForUserId || null, lastDate];
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, values);
    return rows.map(post => new Post(post as Post));
  }

  // Select all the filenames of posts by user id
  async selectFilenamesByUserId(userId: string): Promise<string[]> {
    const query = 'select p.filename from posts p where p.userId = ? and p.filename is not null;';
    const [rows] = await db.pool.execute<RowDataPacket[]>(query, [userId]);
    return rows.map(row => row?.filename);
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
