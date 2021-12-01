import mysql from 'mysql2/promise';
import { env } from './env';

const pool = mysql.createPool({
  host: env.getMariadbHost(),
  user: env.getMariadbUser(),
  password: env.getMariadbPassword(),
  database: env.getMariadbDatabase(),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = Object.freeze({ pool });

export { db };
