module.exports = {
<<<<<<< HEAD
  "development": {
    "username": 'brunito',
    "password": '',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
  },
  "test": {
    "username": 'brunito',
    "password": '',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
  },
  "production": {
    "username": 'brunito',
    "password": '',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
=======
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
>>>>>>> 3e135a74f9f9fc33abff13590f6f1ac8de5116a0
  }
};