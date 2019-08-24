const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    database: process.env.DB_NAME_DEV,
    dialect: process.env.DB_DIALECT_DEV,
    port: process.env.DB_PORT_DEV,
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
    database: process.env.DB_NAME_TEST,
    dialect: process.env.DB_DIALECT_TEST,
    port: process.env.DB_PORT_TEST,
  },
};
