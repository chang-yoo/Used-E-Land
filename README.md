# Usey
A full-stack E-commerce application, using HTML, CSS, JavaScript, PostgreSql, Node.js, WebPack, and React.js for new or secondhand
items for purchasing and selling.

Would you rather keep stuffs that are just left in the house/not being used forever or sell them at a lower price for profit? I recently realized taht there are a lot of items that I don't use anymore but in very good condition. So, I was thinking if I could create an application where it's very simple to upload and easy for users to interact. Used-Ecommerce-land not only lets users to get their wanted items at a lower price but also helps seller to make profits.

## Live Demo
Try the application live at [https://usey.herokuapp.com/](https://usey.herokuapp.com)

## Technologies Used
  - HTML
  - CSS
  - JavaScript
  - Node.js
  - PostgreSql
  - React.js
  - Webpack

## Features
  - user can filter searching by using category
  - user can search title, location, or brand of an item
  - user can see all posts
  - user can see list icon replaced with a logo on mobile size for category
  - user can see most recent posts
  - user can see details of each post
  - user can see a contact of seller
  - user can search posts by using keyword
  - user can navigate to different pages
  - user can see not found page when the page doesn't exist
  - user can see loading page until data loads
  - user can see a menu bar
  - user can create an account
  - user can sign in
  - user can see myprofile
  - user can upload a post
  - user can edit a post
  - user can delete a post
  - each user can save a post to favorite list
  - each user can defavorite a post from favorite page
  - each user can see favorited post is saved after refreshing/log out
  - user can move a post to history page once an item is sold
  - user can see other user's history page
  - user can write a review for other users
  - user can see a review
  - user can sign out

## Preview
![Kapture 2022-06-17 at 02 43 56 2](https://user-images.githubusercontent.com/99840727/174274274-9f52936a-df5d-4981-92a1-d76aa313ddd9.gif)

## Development
  - user can chat in real-time between seller and buyer

## System Requirements
  - Node.js 10 or higher
  - NPM 6 or higher
  - JavaScript ES5 or higher
  - Babel 7 or higher
  - Webpack 5 or higher
  - postgreSql

## Getting Started
 1. Clone the repository. [git@github.com:chang-yoo/final-project.git]
 2. Instal all dependencies with NPM.
    - npm install
 3. Turn on the PostgreSql
    - sudo service postgresql start
 4. Create a database
    - createdb name-of-database
 5. Create a copy of .env.example file and fill those in
  ex.
    - DataBase_URL=postgres://dev:dev@postgres/your-database-name?sslmode=disable
 6. Import datas from database
    - npm run db:import
 7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.
    - npm run dev
