const express = require('express');
const router = express.Router();
const { createRole, getRoles, assignRoleToUser } = require('../controllers/userController');

// Criar uma função
router.post('/roles', createRole);

// Obter todas as funções
router.get('/roles', getRoles);

// Atribuir uma função a um usuário
router.post('/assign-role', assignRoleToUser);

module.exports = router;

/*const express = require('express');
const router = express.Router();
const { createRole, getRoles } = require('../controllers/roleController');

// Criar uma função
router.post('/roles', createRole);

// Obter todas as funções
router.get('/roles', getRoles);

module.exports = router;*/
