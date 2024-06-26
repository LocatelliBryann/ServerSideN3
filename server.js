const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database.js');
const proprietarioRoutes = require('./routes/proprietario.js');
const veiculoRoutes = require('./routes/veiculo.js');
const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/proprietarios', proprietarioRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/auth', authRoutes);

app.post('/auth/login', (req, res) => {
    if ((req.body.usuario === 'bryann') && (req.body.senha === 'bryann0510')) {
        const id = 1;
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300
        });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: "Login inválido" });
});

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao conectar e sincronizar o banco de dados:', err);
    });
