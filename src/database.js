const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const debug = require('debug')('database');
const env = process.env.NODE_ENV;
const dbUrl = process.env.DATABASE_URL;
const readdir = promisify(fs.readdir);

if (env === 'production' && !dbUrl) {
  console.log('DATABASE_URL enviroment variable is needed in production!');
  console.log('Application will exit now!');
  process.exit(1);
}

function databaseLog(msg) {
  debug(msg);
}

const database = (module.exports = new Sequelize(dbUrl || 'sqlite://:memory:', {
  operatorsAliases: false,
  logging: env === 'production' ? false : databaseLog,
}));

// Laod models stored in models folder
const modelsLoadedPromise = readdir(path.join(__dirname, 'models')).then((modelFiles) => {
  for (const modelFile of modelFiles) {
    const model = database.import(path.join(__dirname, 'models', modelFile));
    database.models[model.name] = model;
  }
});

/**
 * Connects to database, returns promise after successful connection.
 */
database.start = (force) => modelsLoadedPromise.then(() => database.sync({ force: env === 'development' || force }));
