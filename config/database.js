const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('veiculos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307
});

module.exports = sequelize;