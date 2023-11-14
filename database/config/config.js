const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("../../config");

module.exports = {
  "development": {
    "username": 'root',
    "password": '123456789',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
  },
  "test": {
    "username": 'root',
    "password": '123456789',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
  },
  "production": {
    "username": 'root',
    "password": '123456789',
    "database": 'biblioteca_db',
    "host": '127.0.0.1',
    "dialect": "mysql"
  }
}
