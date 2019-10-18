
require("dotenv").config();
const environment = process.env.NODE_ENV || "production";

const production = {
  compact: true,
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    use_env_variable: "DATABASE_URL",
    databaseUrl: process.env.DATABASE_URL,
    databaseUser: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    databasePassword: process.env.DATABASE_PASSWORD,
    dialect: "postgres"
  
  }
};

const dev = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    database: process.env.DATABASE,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    dialect: "postgres"
  }
};
const test = {
  app: {
    port: process.env.PORT || 3000
  },
  db: {
    database: process.env.TEST_DATABASE,
    databaseUser: process.env.TEST_DATABASE_USER,
    databasePassword: process.env.TEST_DATABASE_PASSWORD,
    dialect: "postgres"
  }
};
const config = {
  production,
  dev,
  test
};
const env = config[environment];

module.exports = { ...env.db, ...env };
