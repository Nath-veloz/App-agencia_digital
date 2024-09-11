const jwt = require('jsonwebtoken');

// Middleware para proteger rotas
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token usando o segredo
        req.user = decoded; // Anexa as informações do usuário ao objeto 'req'
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;