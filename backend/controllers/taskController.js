const { logActivity } = require('../services/activityLogService');

// Função para criar tarefa
exports.createTask = (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id; // Supondo que a autenticação já foi implementada

    const sql = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
    
    db.query(sql, [title, description, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar tarefa.' });
        }

        // Registra a atividade
        logActivity(userId, 'Criou tarefa', `Tarefa #${result.insertId}`);
        
        return res.status(201).json({ message: 'Tarefa criada com sucesso.', taskId: result.insertId });
    });
};
