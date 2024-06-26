const Veiculo = require('../models/Veiculo.js');
const TipoVeiculo = require('../models/TipoVeiculo.js');

exports.criarVeiculo = async (req, res) => {
  try {
    const { preco } = req.body;
    let idTipo;

    if (preco >= 45000 && preco < 90000) {
      idTipo = 1; // Luxo
    } else if (preco < 45000) {
      idTipo = 2; // Popular
    } else {
      idTipo = 3; // Super Luxo
    }

    const veiculo = await Veiculo.create({ ...req.body, idTipo });
    res.status(201).json(veiculo);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.obterVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.placa);
    if (veiculo) {
      res.json(veiculo);
    } else {
      res.status(404).json({ erro: 'Veículo não encontrado' });
    }
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.obterVeiculosPorProprietario = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      where: { cpfProprietario: req.params.cpfProprietario }
    });
    res.json(veiculos);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.obterVeiculosPorTipo = async (req, res) => {
  try {
    const tipoVeiculo = await TipoVeiculo.findOne({ where: { tipo: req.params.tipo } });
    if (tipoVeiculo) {
      const veiculos = await Veiculo.findAll({
        where: { idTipo: tipoVeiculo.id }
      });
      res.json(veiculos);
    } else {
      res.status(404).json({ erro: 'Tipo de veículo não encontrado' });
    }
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

const updateVeiculo = async (req, res) => {
  const placa = req.params.placa;
  const { modelo } = req.body;

  try {
      const veiculo = await Veiculo.findOne({ where: { placa } });

      if (!veiculo) {
          return res.status(404).json({ error: 'Veículo não encontrado' });
      }

      veiculo.modelo = modelo;
      await veiculo.save();

      return res.json(veiculo);
  } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar veículo' });
  }
};

module.exports = {
  updateVeiculo
};

exports.removerVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findByPk(req.params.placa);
    if (veiculo) {
      await veiculo.destroy();
      res.json({ mensagem: 'Veículo removido com sucesso' });
    } else {
      res.status(404).json({ erro: 'Veículo não encontrado' });
    }
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
