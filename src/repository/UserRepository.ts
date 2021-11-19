import { User, UserType } from '../types';
import { db } from '../utils';

export class UserRepository {

  static async selectById(id: string): Promise<User | undefined> {
    const query = 'select * from users where id = ?';
    const result = await db.pool.query(query, [id]);
    return result[0];
  }

  static async selectByUsername(username: string): Promise<User | undefined> {
    const query = 'select * from users where username = ?';
    const result = await db.pool.query(query, [username]);
    return result[0];
  }

  static async insert(id: string, type: UserType, username: string, password: string) {
    const query = 'insert into users(id, type, username, password) values(?, ?, ?, ?)';
    await db.pool.query(query, [id, type, username, password]);
  }

}
