const Sequelize = require("sequelize");
require("dotenv").config();
const config = require("../config/config");
let sequelize;

console.log("-------------------");
console.log(config);
if (config.use_env_variable) {
  try {
    sequelize = new Sequelize(config.use_env_variable, config.db);
  } catch (e) {
    console.log(e);
  }
} else {
  sequelize = new Sequelize(
    config.db.database,
    config.db.databaseUser,
    config.db.databasePassword,

    {
      dialect: "postgres"
    }
  );
}

module.exports = sequelize;
