/**
 * @file Sequelize models and relations master file.
 */

const path = require('path');

const Sequelize = require('sequelize');

let postgresUrl = 'postgres://marvy@127.0.0.1:5432/marvy';
if (process.env.DATABASE_URL) {
  postgresUrl = process.env.DATABASE_URL;
}
console.log('Connecting with database URL:', postgresUrl);

const sequelize = new Sequelize(postgresUrl, {
  logging: false,
});

const user = sequelize.import(path.join(__dirname, 'user.model.js'));

const db = {
  User: user,
  sequelize,
  Sequelize,
};

module.exports = db;
