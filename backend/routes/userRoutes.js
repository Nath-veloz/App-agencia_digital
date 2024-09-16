const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota de Registro
router.post('/register', userController.register);

// Rota de Login
router.post('/login', userController.login);

module.exports = router;
