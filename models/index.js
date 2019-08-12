const Sequelize = require('sequelize')

const config = require('../config')

module.exports = new Sequelize(
  config.db.database,
  config.db.databaseUser,
  config.db.databasePassword,

  {
    dialect: 'postgres',
  },
);


