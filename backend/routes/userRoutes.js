const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota de Registro
router.post('/register', userController.register);

// Rota de Login
router.post('/login', userController.login);

// Rota para deletar usuário pelo ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
