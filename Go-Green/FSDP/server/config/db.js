const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jason_t", "jason_t", "mysql", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log, // Enable logging
});

module.exports = sequelize;
