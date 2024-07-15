const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const db = {
  sequelize,
  Sequelize,
  Product: require('./product')(sequelize, Sequelize),
};

module.exports = db;