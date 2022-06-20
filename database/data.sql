insert into "users" ("username", "hashedpassword", "phone", "email")
values ('test', '$argon2i$v=19$m=4096,t=3,p=1$8KGSHFbHIXb2xgEsyYjmdA$yAWx4EX6SdSgu1uCSggHgax0MLncGKxXjFn8z/AzAkQ', 1234567890, 'test'),
       ('usedelander', '$argon2i$v=19$m=4096,t=3,p=1$1Q7X36+oQzozqxxYCNZZlQ$HlriopM3/qPs1LlUnoMvlCm5hwfUSFoTJn2wad7zsa0', 7143375263, 'minhijo@gmail.com'),
       ('changhyunyoo', '$argon2i$v=19$m=4096,t=3,p=1$7TfncZc9oykedqMY9g48HQ$hD9Rud+vM1cU8ejlQoTdghdTi6Etn3tJ/ddjHwGtEV8', 5626659228, 'chyoo0428@gmail.com');

insert into "post" ("userId", "imageURL", "location", "condition", "price", "description", "title")
values (2, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655692164664.jpeg', 'Fullerton, CA', 'like new', 200, 'I have used it very well! I just bought another one so want to find a new owner for this baby', 'Burberry Chain Bag'),
       (2, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655692499830.jpeg', 'Fullerton, CA', 'used', 150, 'looking for a new owner for this clutch! There is a sign of used and carried it for couple years and sad to see it just stuck in my room', 'MCM Clutch'),
       (2, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655692682536.jpeg', 'Fullerton, CA', 'like new', 250, 'CONDITION LIKE NEW!, I carried it very well and looking for a new owner!', 'Gucci Cross Bag'),
       (3, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655692937778.jpeg', 'Fullerton, CA', 'used', 80, 'Used it for couple years and still works great! Little dent on front-left side but barely noticeable. lightning charger', 'Beats Pill Speaker'),
       (3, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655693119288.jpeg', 'Fullerton, CA', 'brand new', 50, 'Bought at IKEA to decorate my balcony but did NOT happen and WILL NOT happen. Looking for a new owner who actually needs them!', 'Outdoor Wooden table and chairs'),
       (3, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655693361783.jpeg', 'Fullerton, CA', 'used', 5, 'my cats first liked it!.. But there might be other cats who would have more fun.', 'Cat Toy'),
       (3, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655693644930.jpeg', 'Fullerton, CA', 'brand new', 5, 'came with a keyboard that I have bought. DO NOT pay 10bucks for charger cable. I have a better price!', 'type-c charger'),
       (3, 'https://used-ecommerce.s3.us-west-1.amazonaws.com/1655693909756.jpeg', 'Fullerton, CA', 'very used', 80, 'Size 10 1/2 for men and have waering it for couple years and signs of used.', 'Men Black yeezy boost shoes 350 v2');
