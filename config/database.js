const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './veiculos.sqlite'
});

module.exports = sequelize;