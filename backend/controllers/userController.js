const db = require('../config/db'); // Conexão ao banco de dados
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função de Registro de Usuário
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        // Verifica se o usuário já existe
        const userExists = await new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) reject(err);
                resolve(results.length > 0);
            });
        });

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já registrado com este e-mail.' });
        }

        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Inserir usuário no banco de dados
        const sqlInsert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(sqlInsert, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Erro ao registrar usuário:', err);
                return res.status(500).json({ message: 'Erro ao registrar usuário.' });
            }

            // Gerar Token JWT
            const token = jwt.sign(
                { id: result.insertId, name, email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(201).json({
                message: 'Usuário registrado com sucesso.',
                token,
                user: { id: result.insertId, name, email }
            });

            // Registrar atividade de registro
            const logActivity = require('../services/activityLogService').logActivity;
            logActivity(result.insertId, 'Registrou-se', 'Conta de Usuário');
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Erro no registro do usuário.' });
    }
};

// Função de Login de Usuário
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        // Buscar usuário no banco de dados
        const user = await new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            db.query(sql, [email], (err, results) => {
                if (err) reject(err);
                if (results.length === 0) {
                    resolve(null);
                } else {
                    resolve(results[0]);
                }
            });
        });

        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Comparar senhas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // Gerar Token JWT
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login realizado com sucesso.',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

        // Registrar atividade de login
        const logActivity = require('../services/activityLogService').logActivity;
        logActivity(user.id, 'Fez login', 'Sistema');
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no login do usuário.' });
    }
};
