const config = require("./../../config/config");

module.exports = {
  dialect: config.db.dialect,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  logging: false
}
