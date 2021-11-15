import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  port: 3306,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
});

const db = Object.freeze({ pool });

export { db };
