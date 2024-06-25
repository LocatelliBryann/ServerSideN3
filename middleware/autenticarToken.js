const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  jwt.verify(token, 'sua_chave_secreta', (erro, decoded) => {
    if (erro) return res.status(403).json({ erro: 'Falha ao autenticar token' });
    req.usuarioId = decoded.id;
    next();
  });
}

module.exports = autenticarToken;
