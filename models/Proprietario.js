const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Proprietario = sequelize.define('Proprietario', {
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Proprietario;
