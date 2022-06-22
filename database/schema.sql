set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" TEXT NOT NULL,
  "hashedpassword" TEXT NOT NULL,
  "createdAt" timestamptz(6) not null default now(),
  "phone" BIGINT NOT NULL,
  "email" TEXT NOT NULL,
  primary key ("userId"),
  unique ("username")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."post" (
  "postId" serial NOT NULL,
  "userId" int NOT NULL,
  "imageURL" TEXT NOT NULL,
  "location" TEXT,
  "createdAt" timestamptz(6) not null default now(),
  "category"  TEXT NOT NULL,
  "condition" TEXT NOT NULL,
  "price" TEXT NOT NULL,
  "size" TEXT NOT NULL,
  "brand" TEXT NOT NULL default 'N/A',
  "style" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "updatedAt" timestamptz(6) not null default now(),
  "status" TEXT not null default 'open',
  primary key ("postId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."review" (
  "reviewId" serial NOT NULL,
  "reviewerId" int NOT NULL,
  "userId" int NOT NULL,
  "text" text NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messenger" (
  "messengerId" serial NOT NULL,
  "userId" int NOT NULL,
  "content" TEXT NOT NULL,
  "postId" int NOT NULL,
  "createdAt" timestamptz(6) not null default now(),
  CONSTRAINT "messenger_pk" PRIMARY KEY ("messengerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorite" (
  "postId" int NOT NULL,
  "userId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
  "imageId" serial NOT NULL,
  "url" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "post" ADD CONSTRAINT "post_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "review" ADD CONSTRAINT "review_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk0" FOREIGN KEY ("postId") REFERENCES "post"("postId");
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
