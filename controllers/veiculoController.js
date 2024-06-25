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

exports.atualizarVeiculo = async (req, res) => {
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

    const [atualizou] = await Veiculo.update({ ...req.body, idTipo }, {
      where: { placa: req.params.placa }
    });
    if (atualizou) {
      const veiculoAtualizado = await Veiculo.findByPk(req.params.placa);
      res.json(veiculoAtualizado);
    } else {
      res.status(404).json({ erro: 'Veículo não encontrado' });
    }
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
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
