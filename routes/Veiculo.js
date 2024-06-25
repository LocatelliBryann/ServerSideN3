const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController.js');
const autenticarToken = require('../middleware/autenticarToken.js');

router.post('/', autenticarToken, veiculoController.criarVeiculo);
router.get('/:placa', autenticarToken, veiculoController.obterVeiculo);
router.get('/proprietario/:cpfProprietario', autenticarToken, veiculoController.obterVeiculosPorProprietario);
router.get('/tipo/:tipo', autenticarToken, veiculoController.obterVeiculosPorTipo);
router.put('/:placa', autenticarToken, veiculoController.atualizarVeiculo);
router.delete('/:placa', autenticarToken, veiculoController.removerVeiculo);

module.exports = router;
