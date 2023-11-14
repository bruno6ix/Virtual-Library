const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  use_env_variable: '?',
});

module.exports = {
  development: {
    ...sequelize.config,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    use_env_variable: '?',
  },
};
