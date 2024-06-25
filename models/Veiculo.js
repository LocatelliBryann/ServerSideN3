const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Proprietario = require('./Proprietario.js');
const TipoVeiculo = require('./TipoVeiculo');

const Veiculo = sequelize.define('Veiculo', {
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

Veiculo.belongsTo(Proprietario, { foreignKey: 'cpfProprietario' });
Veiculo.belongsTo(TipoVeiculo, { foreignKey: 'idTipo' });

module.exports = Veiculo;
