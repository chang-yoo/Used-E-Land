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

app.get('/api/category/:keyword', (req, res, next) => {
  const keyword = req.params.keyword;
  if (!keyword) {
    throw new ClientError(400, 'searching keyword is required');
  }
  const sql = `
    select*
    from "post"
    where "category" = $1
    and "status" = 'open'
  `;
  const params = [keyword];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/categoryAll/:keyword', (req, res, next) => {
  const keyword = req.params.keyword;
  if (!keyword) {
    throw new ClientError(400, 'searching keyword is required');
  }
  const sql = `
    select*
    from "post"
    where "category" iLike $1 ||'%'
    and "status" = 'open'
  `;
  const params = [keyword];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/main', (req, res, next) => {
  const sql = `
  select *
  from "post"
  where "status" = 'open'
  order by "postId" desc
  limit 4
  `;
  db
    .query(sql)
    .then(result => {
      return res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/all', (req, res, next) => {
  const sql = `
  select *
  from "post"
  where "status" = 'open'
  order by "postId" desc
  `;
  db
    .query(sql)
    .then(result => {
      return res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/post/:postId', (req, res, next) => {
  const targetId = Number(req.params.postId);
  if (!Number.isInteger(targetId) || targetId <= 0) {
    throw new ClientError(400, 'postId must be a positive integer!');
  }
  let userId = null;
  if (req.headers['x-access-token']) {
    userId = jwt.verify(req.headers['x-access-token'], process.env.TOKEN_SECRET).userId;
  }
  const sql = `
 select "post".*,
         "seller"."userId",
         "seller"."username",
         "seller"."phone",
         "seller"."email",
("favorite"."postId" is not null) as "isFavorite"
  from "post"
  join "users" as "seller" using ("userId")
  left join "favorite"
    on "favorite"."postId" = $1
   and "favorite"."userId" = $2
  where "post"."postId" = $1
  `;
  const params = [targetId, userId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.status(201).json(data);
    })
    .catch(err => next(err));
});

app.get('/api/complete/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId) || userId < 1) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
  select*
  from "post"
  join "users" using ("userId")
  where "userId" = $1
  and "status" = 'closed'
  `;
  const params = [userId];
  db
    .query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/review/:userId', (req, res, next) => {
  const targetUserId = Number(req.params.userId);
  if (!targetUserId) {
    throw new ClientError(400, 'UserId is missing');
  }
  const sql = `
  select "review"."text",
    "review"."reviewId",
    "users"."username"
  from "review"
  inner join "users"
  on "review"."reviewerId" = "users"."userId"
  where "review"."userId" = $1
  order by "reviewId" desc
  `;
  const params = [targetUserId];
  db
    .query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
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
    and "status" = 'open'
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
  const { username, password, phone, email } = req.body;
  if (!username || !password || !phone || !email) {
    throw new ClientError(400, 'username, password, phone, email are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedpassword", "phone", "email")
        values ($1, $2, $3, $4)
        returning "userId", "username", "phone", "email"
      `;
      const params = [username, hashedPassword, phone, email];
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
  const url = req.file.location;

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
      return res.status(201).json(data);
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
  and "post"."status" = 'open'
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
  const { imageURL, location, condition, price, description, title, category, size, brand, style, color } = req.body;
  if (!imageURL || !location || !condition || !price || !description || !title || !category || !size || !brand || !style || !color) {
    throw new ClientError(400, 'imageURL, location, condition, price, description, category, size, brand, style, color and title are required fields');
  }
  const sql = `
  insert into "post" ("userId", "imageURL", "location", "condition", "price", "description", "title", "category", "size", "brand", "style", "color")
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  returning*
  `;
  const params = [userId, imageURL, location, condition, price, description, title, category, size, brand, style, color];
  db
    .query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/edit/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  const { imageURL, location, condition, price, description, title, category, size, brand, style, color } = req.body;
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  if (!imageURL || !location || !condition || !price || !description || !title || !category || !size || !brand || !style || !color) {
    throw new ClientError(400, 'imageURL, location, condition, price, description, category, size, brand, style, color and title are required fields');
  }
  const sql = `
  update "post"
    set "imageURL" = $1,
        "location" = $2,
        "condition" = $3,
        "price" = $4,
        "description" = $5,
        "title" = $6,
        "updatedAt" = now(),
        "category" = $7,
        "size" = $8,
        "brand" = $9,
        "style" = $10,
        "color" = $11
    where "postId" = $12
    returning*
  `;
  const params = [imageURL, location, condition, price, description, title, category, size, brand, style, color, postId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.json(data);
    })
    .catch(err => next(err));
});

app.delete('/api/edit/:postId', (req, res, next) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
  delete from "post"
  where "postId" = $1
  returning*
  `;
  const params = [postId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      if (data) {
        return res.status(200).json(data);
      }
      throw new ClientError(404, `Cannot find post with postId of ${postId}`);
    })
    .catch(err => next(err));
});

app.post('/api/favorite/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
  insert into "favorite" ("userId", "postId")
  values ($1, $2)
  returning*
  `;
  const params = [userId, postId];
  db
    .query(sql, params)
    .then(result => {
      return res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/favorite', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
  select "post".*
  from "post"
  join "favorite" using ("postId")
  where "favorite"."userId" = $1
  and "post"."status" = 'open'
  `;
  const params = [userId];
  db
    .query(sql, params)
    .then(result =>
      res.json(result.rows))
    .catch(err => next(err));
});

app.delete('/api/favorite/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
  delete
  from "favorite"
  where "userId" = $1
  and "postId" = $2
  returning*
  `;
  const params = [userId, postId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      if (data) {
        return res.status(200).json(data);
      }
      throw new ClientError(404, `Cannot find post with postId of ${postId}`);
    })
    .catch(err => next(err));
});

app.patch('/api/complete/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
  update "post"
  set "status" = 'closed'
  where "postId" = $1
  and "userId" = $2
  returning "status"
  `;
  const params = [postId, userId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.json(data);
    })
    .catch(err => next(err));
});

app.put('/api/complete/:postId', (req, res, next) => {
  const { userId } = req.user;
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    throw new ClientError(400, 'postId must be a positive integer');
  }
  const sql = `
  update "post"
  set "status" = 'open'
  where "postId" = $1
  and "userId" = $2
  returning "status"
  `;
  const params = [postId, userId];
  db
    .query(sql, params)
    .then(result => {
      const data = result.rows;
      return res.json(data);
    })
    .catch(err => next(err));
});

app.post('/api/review/:userId', (req, res, next) => {
  const { userId } = req.user;
  const sellerId = Number(req.params.userId);
  if (!Number.isInteger(sellerId) || sellerId < 1) {
    throw new ClientError(400, 'sellerId must be a positive Integer');
  }
  const { text } = req.body;
  if (!text) {
    throw new ClientError(400, 'Missing a review');
  }

  const sql = `
  insert into "review" ("userId", "reviewerId", "text")
  values ($1, $2, $3)
  returning*
  `;
  const params = [sellerId, userId, text];
  db
    .query(sql, params)
    .then(result => {
      const newReview = result.rows;
      return res.status(201).json(newReview);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
