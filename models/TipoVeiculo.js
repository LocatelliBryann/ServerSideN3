const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const TipoVeiculo = sequelize.define('TipoVeiculo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = TipoVeiculo;
