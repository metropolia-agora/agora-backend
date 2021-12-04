const faker = require('faker');
const { v4: uuid4 } = require('uuid');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = Object.freeze({ pool });

const user_count = 50;
const post_count = 200;
const max_comment_count = 10;
const max_reaction_count = 50;

const userIds = [];

const generateRandomImageUrl = () => {
  const width = Math.floor(Math.random() * 600);
  const height = Math.floor(Math.random() * 600);
  return `https://picsum.photos/${width}/${height}`;
};

const generateUsers = async (count) => {
  for (let i = 0; i < count; i++) {
    const hasProfilePicture = Math.random() <= 0.7;
    const timestamp = faker.date.past();
    const user = {
      id: uuid4(),
      type: 1,
      username: faker.internet.userName(),
      password: await bcrypt.hash(faker.internet.password(20, false), 10),
      filename: hasProfilePicture ? generateRandomImageUrl() : null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    userIds.push(user.id);
    const query = 'insert into users(id, type, username, password, filename, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?, ?)';
    await db.pool.execute(query, Object.values(user));
  }
};

const generatePosts = async (count) => {
  for (let i = 0; i < count; i++) {
    const hasTextContent = Math.random() < 0.7;
    const hasFileContent = Math.random() < 0.5 || !hasTextContent;
    const ownerId = userIds[Math.floor(Math.random() * userIds.length)];
    const timestamp = faker.date.recent();
    const reactionCount = Math.floor(Math.random() * max_reaction_count);
    const commentCount = Math.floor(Math.random() * max_comment_count);
    const post = {
      id: uuid4(),
      userId: ownerId,
      content: hasTextContent ? faker.lorem.sentences() : null,
      filename: hasFileContent ? generateRandomImageUrl() : null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const query = 'insert into posts(id, userId, content, filename, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?)';
    await db.pool.execute(query, Object.values(post));
    await generateReactionsForPost(post.id, post.userId, post.createdAt, reactionCount);
    await generateCommentsForPost(post.id, post.userId, post.createdAt, commentCount);
  }
};

const generateCommentsForPost = async (postId, postOwnerId, postCreatedAt, count) => {
  for (let i = 0; i < count; i++) {
    const ownerId = userIds.filter(id => id !== postOwnerId)[Math.floor(Math.random() * (userIds.length - 1))];
    const timestamp = faker.date.between(postCreatedAt, new Date());
    const comment = {
      id: uuid4(),
      postId,
      userId: ownerId,
      content: faker.lorem.sentence(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const query = 'insert into comments(id, postId, userId, content, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?)';
    await db.pool.execute(query, Object.values(comment));
  }
};

const generateReactionsForPost = async (postId, postOwnerId, postCreatedAt, count) => {
  const cannotReact = [postOwnerId];
  for (let i = 0; i < count; i++) {
    const canReact = userIds.filter(id => !cannotReact.includes(id));
    const ownerId = canReact[Math.floor(Math.random() * (canReact.length - 1))];
    cannotReact.push(ownerId);
    const timestamp = faker.date.between(postCreatedAt, new Date());
    const isUpvote = Math.random() <= 0.8;
    const reaction = {
      postId,
      userId: ownerId,
      type: isUpvote ? 1 : -1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const query = 'insert into reactions(postId, userId, type, createdAt, updatedAt) values (?, ?, ?, ?, ?)';
    await db.pool.execute(query, Object.values(reaction));
  }
};

const main = async () => {
  const startTime = Date.now();
  console.info('DB SEEDER: starting...');
  await generateUsers(user_count);
  await generatePosts(post_count);
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.info(`DB SEEDER: generated ${user_count} users and ${post_count} posts in ${duration} seconds.`);
  process.exit(0);
};

(async () => await main())();
