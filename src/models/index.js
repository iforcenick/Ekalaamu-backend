import { Sequelize } from 'sequelize';
import config from '../config/config';

require('dotenv').config();

let connection;

if (process.env.NODE_ENV === 'production') {
  try {
    connection = new Sequelize(config.db.databaseUrl);
  } catch (e) {
    console.log(e);
  }
} else {
  connection = new Sequelize(
    process.env.DATABASE_URL || config.db.database,
    config.db.databaseUser || process.env.DATABASE_USER,
    config.db.databasePassword || process.env.DATABASE_PASSWORD,

    {
      host: process.env.DATABASE_HOST || 'localhost',
      dialect: 'postgres',
    },
  );
}
module.exports = connection;
