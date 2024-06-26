const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js');
const proprietarioRoutes = require('./routes/proprietario.js');
const veiculoRoutes = require('./routes/veiculo.js');
const authRoutes = require('./routes/auth.js');
const validarToken = require('./middleware/autenticarToken.js');

const app = express();

app.use(bodyParser.json());

app.use('/veiculos', validarToken);
app.use('/proprietarios', validarToken);

app.use('/proprietarios', proprietarioRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
});
