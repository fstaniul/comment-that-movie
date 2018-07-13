let server;

//Open database!
before(function beforeAllTests() {
  require('dotenv').config();
  process.env.NODE_ENV = 'test';
  server = require('../src/server');
  return server.db.start();
});

//Close server and database
after(function afterAllTests() {
  return server.close();
});
