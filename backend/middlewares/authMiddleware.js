const jwt = require('jsonwebtoken');
const Role = require('../models/Role');

// Middleware para proteger rotas e verificar permissões
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Buscar a função do usuário e verificar permissões
    const userRole = await Role.findByPk(req.user.roleId);
    if (!userRole) {
      return res.status(403).json({ message: 'Permissões insuficientes' });
    }

    req.user.permissions = userRole.permissions; // Anexa as permissões ao objeto 'req'
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar permissões específicas
const checkPermission = (permission) => (req, res, next) => {
  if (!req.user.permissions.includes(permission)) {
    return res.status(403).json({ message: 'Permissão negada' });
  }
  next();
};

module.exports = { authMiddleware, checkPermission };


/*const jwt = require('jsonwebtoken');

// Middleware para proteger rotas
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    // O token geralmente é enviado como "Bearer <token>", então vamos separar
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token usando o segredo
        req.user = decoded; // Anexa as informações do usuário ao objeto 'req'
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;*/
