import { Sequelize } from 'sequelize';
import config from '../../config/config';

require('dotenv').config();

let connection;

if (config.use_env_variable) {
  try {
    connection = new Sequelize(config.db.databaseUrl);
  } catch (e) {
    console.log(e);
  }
} else {
  connection = new Sequelize(
    config.db.database,
    config.db.databaseUser,
    config.db.databasePassword,

    {
      dialect: 'postgres',
    },
  );
}
module.exports = connection;
