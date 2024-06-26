const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ auth: false, message: 'Não há token' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Erro com a autenticação do token' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;
