const express = require('express');
const router = express.Router();
const proprietarioController = require('../controllers/proprietarioController.js');

router.post('/', proprietarioController.criarProprietario);
router.get('/:cpf', proprietarioController.obterProprietario);
router.put('/:cpf', proprietarioController.atualizarProprietario);
router.delete('/:cpf', proprietarioController.removerProprietario);

module.exports = router;
