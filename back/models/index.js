/**
 * @file Sequelize models and relations master file.
 */

const Sequelize = require('sequelize');

var postgresUrl = 'postgres://sirodoht@127.0.0.1:5432/aspen';
if (process.env.DATABASE_URL) {
  postgresUrl = process.env.DATABASE_URL;
}
console.log('Connecting with database URL:', postgresUrl);

const sequelize = new Sequelize(postgresUrl, {
  logging: false,
});

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
