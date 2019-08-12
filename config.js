require('dotenv/config')
const environment = process.env.NODE_ENV;

const dev = {
    app: {
        port: process.env.PORT || 3000    
    },
    db: {
        
        database: process.env.DATABASE,
        databaseUser: process.env.DATABASE_USER,
        databasePassword: process.env.DATABASE_PASSWORD
    }

};
const test = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        database: process.env.TEST_DATABASE,
        databaseUser: process.env.TEST_DATABASE_USER,
        databasePassword: process.env.TEST_DATABASE_PASSWORD
    }

};
const config = {
    dev,
    test
};

module.exports = config[environment];
