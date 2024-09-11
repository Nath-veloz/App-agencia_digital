const db = require('../config/db'); // Conexão ao banco de dados

// Função para registrar atividade
function logActivity(userId, action, target) {
    const sql = 'INSERT INTO activity_logs (user_id, action, target) VALUES (?, ?, ?)';
    
    db.query(sql, [userId, action, target], (err, result) => {
        if (err) {
            console.error('Erro ao registrar atividade:', err);
            return;
        }
        console.log('Atividade registrada com sucesso:', result);
    });
}

module.exports = { logActivity };
