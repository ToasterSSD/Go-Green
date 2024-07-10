const { Sequelize } = require('sequelize');

// im so stupid
//nevermind im actually so stupid
const sequelize = new Sequelize('project', 'project', 'project', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;