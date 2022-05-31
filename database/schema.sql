set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."user" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedpassword" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."post" (
	"postId" serial NOT NULL,
	"userId" int NOT NULL,
	"imageURL" TEXT NOT NULL,
	"location" TEXT,
	"createdAt" timestamp with time zone NOT NULL,
	"condition" TEXT NOT NULL,
	"price" int NOT NULL,
	"description" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	CONSTRAINT "post_pk" PRIMARY KEY ("postId")
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
	"createdAt" timestamp with time zone NOT NULL,
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




ALTER TABLE "post" ADD CONSTRAINT "post_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "review" ADD CONSTRAINT "review_fk0" FOREIGN KEY ("postId") REFERENCES "post"("postId");
ALTER TABLE "review" ADD CONSTRAINT "review_fk1" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "messenger" ADD CONSTRAINT "messenger_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
ALTER TABLE "messenger" ADD CONSTRAINT "messenger_fk1" FOREIGN KEY ("postId") REFERENCES "post"("postId");

ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk0" FOREIGN KEY ("postId") REFERENCES "post"("postId");
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_fk1" FOREIGN KEY ("userId") REFERENCES "user"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "user"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "post"("postId");
