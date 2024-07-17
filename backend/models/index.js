const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const db = {
  sequelize,
  Sequelize,
  Product: require('./product')(sequelize, Sequelize),
  User: require('./user')(sequelize, Sequelize),
};

// If you have any associations between models, define them here
// For example:
// db.User.hasMany(db.Product);
// db.Product.belongsTo(db.User);

module.exports = db;