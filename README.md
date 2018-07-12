# comment-that-movie

Simple REST Api which allows commenting on movies. It is using external movies resource at omdbapi.com

## Installation

You will need `node.js` with `npm` installed on your machine.

```
$ git clone git@github.com:vip1all/comment-that-movie.git
$ cd ./comment-that-movie
$ npm install
```

## Running

**Using heroku:**

```
$ heroku local
```

You should be able to access the REST Api at `localhost:3000`.

**Manually:**

```
node src/server.js
```

By default app will run in `development` mode. To enable `production` mode set enviroment variable `NODE_ENV=production`. Production mode uses PostgreSQL so you will need that too. To set database connection url set `DATABASE_URL=your/database/url`. **Heroku** uses `.env` file for enviroment variables, so if you are running it with **heroku**, edit `.env`.
