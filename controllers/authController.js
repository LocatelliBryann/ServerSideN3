const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario.js');

exports.criarUsuario = async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const novoUsuario = await Usuario.create({ usuario, senha });
    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });
    if (!usuarioEncontrado || !bcrypt.compareSync(senha, usuarioEncontrado.senha)) {
      return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    }
    const token = jwt.sign({ id: usuarioEncontrado.id }, 'sua_chave_secreta', { expiresIn: '1h' });
    res.json({ token });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
};
