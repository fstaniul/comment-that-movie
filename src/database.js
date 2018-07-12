const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

const IS_DEV = (process.env.NODE_ENV || 'development') === 'development';

const DEFAULT_DATABASE_SETTINGS = {
  operatorsAliases: false,
};

let database;

if (IS_DEV || !process.env.DATABASE_URL) {
  database = module.exports = new Sequelize({
    ...DEFAULT_DATABASE_SETTINGS,
    dialect: 'sqlite',
    storage: ':memory:',
  });
} else {
  database = module.exports = new Sequelize(process.env.DATABASE_URL, {
    ...DEFAULT_DATABASE_SETTINGS,
  });
}

// Laod models stored in models folder
const modelsLoadedPromise = readdir(path.join(__dirname, 'models')).then((modelFiles) => {
  for (const modelFile of modelFiles) {
    database.import(path.join(__dirname, 'models', modelFile));
  }
});

/**
 * Connects to database, returns promise after successful connection.
 */
database.start = (force) => modelsLoadedPromise.then(() => database.sync({ force: IS_DEV || force }));
