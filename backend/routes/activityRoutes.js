const express = require('express');
const { getActivityLog } = require('../controllers/activityController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Rota para buscar histórico de atividades (protegida)
router.get('/history', authMiddleware, getActivityLog);

module.exports = router;