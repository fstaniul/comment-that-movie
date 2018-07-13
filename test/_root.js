const server = require('../src/server');

//Open database!
before(function beforeAllTests() {
  return server.db.start();
});

//Close server and database
after(function afterAllTests() {
  return server.close();
});
