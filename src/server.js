const PORT = process.env.PORT || 3000;

const express = require('express');
const database = require('./database');

const app = express();

app.get('/', (req, res) => {
  res.send('Checkout the github repo for this REST Api: https://github.com/vip1all/comment-that-movie');
});

app.start = async function() {
  await database.start();
  app.listen(PORT, () => {
    cosnole.log(`Server started successfully, listening for connections on port :${PORT}`);
  });
};
