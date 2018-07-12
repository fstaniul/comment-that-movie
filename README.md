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
To run development version specify enviroment variable `NODE_ENV=development`

**On windows:**
```
$ set NODE_ENV=development && node src/server.js
```

**On Unix-like system**:
```
$ NODE_ENV=development node src/server.js
```
