const db = require('../config/db'); // Conexão ao banco de dados

// Função para registrar atividade
async function logActivity(userId, action, target) {
    const sql = 'INSERT INTO activity_logs (user_id, action, target) VALUES (:userId, :action, :target)';

    try {
        const result = await db.query(sql, {
            replacements: { userId, action, target }, // Passa os parâmetros corretamente
            type: db.QueryTypes.INSERT, // Define o tipo de query
        });
        console.log('Atividade registrada com sucesso:', result);
    } catch (err) {
        console.error('Erro ao registrar atividade:', err);
    }
}

module.exports = { logActivity };