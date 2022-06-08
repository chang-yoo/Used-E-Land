set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedpassword" TEXT NOT NULL,
	"createdAt" timestamptz(6) not null default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."post" (
	"postId" serial NOT NULL,
	"userId" int NOT NULL,
	"imageURL" TEXT NOT NULL,
	"location" TEXT,
	"createdAt" timestamptz(6) not null default now(),
	"condition" TEXT NOT NULL,
	"price" int NOT NULL,
	"description" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"updatedAt" timestamptz(6) not null default now()
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."review" (
	"postId" int NOT NULL,
	"userId" int NOT NULL
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



CREATE TABLE "public"."likes" (
	"userId" int NOT NULL,
	"postId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
	"imageId" serial NOT NULL,
	"url" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);
