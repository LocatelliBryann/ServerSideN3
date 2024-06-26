const express = require('express');
const router = express.Router();
const Veiculo = require('../models/Veiculo');

router.get('/', async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll();
        res.json(veiculos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const veiculo = await Veiculo.create(req.body);
        res.status(201).json(veiculo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

router.get('/proprietarios/:cpf', async (req, res) => {
    const cpf = req.params.cpf;
    try {
        const veiculos = await Veiculo.findAll({
            where: { cpfProprietario: cpf }
        });
        res.json(veiculos);
    } catch (err) {
        console.error('Erro ao buscar veículos por proprietário:', err);
        res.status(500).json({ error: 'Erro ao buscar veículos por proprietário' });
    }
});

router.get('/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo; 
   
    const veiculosDoTipo = [
        { placa: 'ABC1234', modelo: 'Uno' },
    ];

    res.json(veiculosDoTipo);
});

router.put('/:placa', async (req, res) => {
    const placa = req.params.placa;
    try {
        const [updated] = await Veiculo.update(req.body, {
            where: { placa: placa }
        });
        if (updated) {
            const updatedVeiculo = await Veiculo.findOne({ where: { placa: placa } });
            return res.json(updatedVeiculo);
        }
        throw new Error('Veículo não encontrado');
    } catch (err) {
        console.error('Erro ao atualizar veículo:', err);
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;


