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
};
