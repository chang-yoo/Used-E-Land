require('dotenv/config');
const path = require('path');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const app = express();
const publicPath = path.join(__dirname, 'public');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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
      const [newUser] = result.rows;
      res.status(201).json(newUser);
    })
    .catch(err => next(err));
});

app.post('/api/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required in this field');
  }
  const sql = `
  select "userId", "hashedpassword"
  from "users"
  where "username" = $1
  `;
  const params = [username];
  db
    .query(sql, params)
    .then(result => {
      const [data] = result.rows;
      if (!data) {
        throw new ClientError(401, 'Database cannot find any matched data');
      }
      const { userId, hashedpassword } = data;
      argon2
        .verify(hashedpassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'password is invalid');
          }
          const payload = {
            userId,
            username
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          return res.status(200).json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/images', uploadsMiddleware, (req, res, next) => {
  const url = `/images/${req.file.filename}`;
  const sql = `
  insert into "images" ("url")
  values ($1)
  returning*
  `;
  const params = [url];
  db
    .query(sql, params)
    .then(result => {
      const [data] = result.rows;
      res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/myprofile', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select*
  from "post"
  join "users" using ("userId")
  where "userId" = $1

  `;
  const params = [userId];
  db
    .query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/upload', (req, res, next) => {
  const { userId } = req.user;
  const { imageURL, location, condition, price, description, title } = req.body;
  if (!imageURL || !location || !condition || !price || !description || !title) {
    throw new ClientError(400, 'imageURL, location, condition, price, description, and title are required fields');
  }
  const sql = `
  insert into "post" ("userId", "imageURL", "location", "condition", "price", "description", "title")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning*
  `;
  const params = [userId, imageURL, location, condition, price, description, title];
  db
    .query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
