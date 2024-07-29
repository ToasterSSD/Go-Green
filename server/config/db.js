const { Sequelize } = require('sequelize');

// im so stupid
//nevermind im actually so stupid
const sequelize = new Sequelize('project', 'project', 'project', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;