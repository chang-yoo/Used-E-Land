require('dotenv/config');
const path = require('path');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const app = express();
const publicPath = path.join(__dirname, 'public');

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
  `;
  return db
    .query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(express.json());

app.get('/api/post/:postId', (req, res, next) => {
  const targetId = Number(req.params.postId);
  if (!Number.isInteger(targetId) || targetId <= 0) {
    throw new ClientError(400, 'postId must be a positive integer!');
  }
  const sql = `
  select*
  from "post"
  where "postId" = ${targetId}
  `;
  return db
    .query(sql)
    .then(result =>
      res.json(result.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
