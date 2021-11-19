import mariadb from 'mariadb';
import { env } from './env';

const pool = mariadb.createPool({
  port: 3306,
  host: env.getMariadbHost(),
  user: env.getMariadbUser(),
  password: env.getMariadbPassword(),
  database: env.getMariadbDatabase(),
});

const db = Object.freeze({ pool });

export { db };
