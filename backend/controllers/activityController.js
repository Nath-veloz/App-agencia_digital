// Buscar histórico de atividades
exports.getActivityLog = (req, res) => {
    const sql = `
        SELECT al.id, al.action, al.target, al.created_at, u.name AS user_name
        FROM activity_logs al
        JOIN users u ON al.user_id = u.id
        ORDER BY al.created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar histórico de atividades.' });
        }
        return res.status(200).json(results);
    });
};
