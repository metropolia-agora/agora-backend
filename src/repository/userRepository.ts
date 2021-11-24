import { User, UserType } from '../entities';
import { db } from '../utils';

class UserRepository {

  async selectById(id: string): Promise<User | undefined> {
    const query = 'select * from users where id = ?';
    const result = await db.pool.query(query, [id]);
    if (result[0]) return new User(result[0]);
  }

  async selectByUsername(username: string): Promise<User | undefined> {
    const query = 'select * from users where username = ?';
    const result = await db.pool.query(query, [username]);
    if (result[0]) return new User(result[0]);
  }

  async insert(id: string, type: UserType, username: string, password: string): Promise<void> {
    const query = 'insert into users(id, type, username, password) values(?, ?, ?, ?)';
    await db.pool.query(query, [id, type, username, password]);
  }

  async delete(id: string): Promise<void> {
    const query = 'delete from users where id = ?';
    await db.pool.query(query, [id]);
  }

  async update(id: string, fields: Partial<User>): Promise<void> {
    const keys = Object.keys(fields).map(field => `${field} = ?`).join(' ');
    const values = Object.values(fields);
    const query = `update users set ${keys} where id = ?`;
    await db.pool.query(query, [...values, id]);
  }

}

export const userRepository = new UserRepository();
