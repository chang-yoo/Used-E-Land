require('dotenv/config');
const path = require('path');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const app = express();
const publicPath = path.join(__dirname, 'public');
const argon2 = require('argon2');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/main', (req, res, next) => {
  const sql = `
  select *
  from "post"
  order by "postId" desc
  limit 4
  `;
  return db
    .query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/post/:postId', (req, res, next) => {
  const targetId = Number(req.params.postId);
  if (!Number.isInteger(targetId) || targetId <= 0) {
    throw new ClientError(400, 'postId must be a positive integer!');
  }
  const sql = `
  select*
  from "post"
  where "postId" = $1
  `;
  const params = [targetId];
  return db
    .query(sql, params)
    .then(result =>
      res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/search/:keyword', (req, res, next) => {
  const keyword = req.params.keyword;
  if (!keyword) {
    throw new ClientError(400, 'searching keyword is required');
  }
  const sql = `
    select*
    from "post"
    where "title" ilike '%' || $1 || '%'
  `;
  const params = [keyword];
  db
    .query(sql, params)
    .then(result =>
      res.json(result.rows))
    .catch(err => next(err));
});

app.use(express.json());

app.post('/api/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedpassword")
        values ($1, $2)
        returning "userId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
