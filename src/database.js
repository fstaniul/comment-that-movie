const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

const IS_DEV = (process.env.NODE_ENV || 'development') === 'development';

// setup database connection and export Sequelize object
const database = (module.exports = new Sequelize(process.env.DATABASE_URL || ':memory:', {
  operatorsAliases: false,
}));

// Laod models stored in models folder
const modelsLoadedPromise = readdir(path.join(__dirname, 'models')).then((modelFiles) => {
  for (const modelFile of modelFiles) {
    const name = modelFile.replace(/\.js/, '');
    database.import(name, require(path.join(__dirname, 'models', modelFile)));
  }
});

/**
 * Connects to database, returns promise after successful connection.
 */
database.start = () => modelsLoadedPromise.then(() => database.sync({ force: IS_DEV }));
