// OMDB_API_KEY is required for this application to run since it is using external service
// for videos fetching so check for presance of key in enviroment
if (!process.env.OMDB_API_KEY) {
  console.log('Cannot find omdbapi.com apikey.');
  console.log('Please ensure that enviroment variable OMDB_API_KEY is set with a apikey for omdbapi.com');
  console.log('Application will exit now.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

app.db = database;
app.use(bodyParser.json());

//set /movies and /comments routes
app.use(require('./api/movies'), require('./api/comments'));

app.get('/', (req, res) => {
  res.send('Checkout the github repo for this REST Api: https://github.com/vip1all/comment-that-movie');
});

app.start = async function() {
  await app.db.start();
  return new Promise((resolve, reject) => {
    app.listen(PORT, (err) => {
      if (err) return reject(err);
      else {
        console.log(`Server started and listening for connections on port :${PORT}`);
        resolve();
      }
    });
  });
};

// executed by calling node src/server.js
if (require.main === module) {
  app.start().then(() => console.log('Application started.'));
}
