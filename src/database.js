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

const database = (module.exports = new Sequelize(dbUrl || 'sqlite://:memory:', {
  operatorsAliases: false,
  logging: env === 'production' ? false : (msg) => debug(msg),
}));

function associateModels() {
  const promises = Object.values(database.models).map((model) =>
    Promise.resolve(model.associate && model.associate(database))
  );
  return Promise.all(promises);
}

function importModels(modelFiles) {
  for (const modelFile of modelFiles) {
    const model = database.import(path.join(__dirname, 'models', modelFile));
    database.models[model.name] = model;
  }
}

// Laod models stored in models folder
const modelsImportedPromise = readdir(path.join(__dirname, 'models'))
  .then(importModels)
  .then(associateModels);

/**
 * Connects to database, returns promise after successful connection.
 */
database.start = (force) =>
  modelsImportedPromise
    .then(() => database.sync({ force }))
    .then(() => console.log('Database initialized and connected.'));
