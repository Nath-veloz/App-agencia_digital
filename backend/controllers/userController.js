const db = require('../config/db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../config/env');
const logActivity = require('../services/activityLogService').logActivity;

// Função de Registro de Usuário
exports.register = async (req, res) => {
    const { name, email, password, roleId } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId,
        });

        const token = jwt.sign(
            { id: newUser.id, name: newUser.name, email: newUser.email },
            process.env.JWT_SECRET || secretKey,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Usuário registrado com sucesso.',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email, roleId: newUser.roleId }
        });

        logActivity(newUser.id, 'Registrou-se', 'Conta de Usuário');
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
        const user = await User.findOne({ where: { email } });
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
            process.env.JWT_SECRET || secretKey,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.status(200).json({
            message: 'Login realizado com sucesso.',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

        // Registrar atividade de login
        logActivity(user.id, 'Fez login', 'Sistema');
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no login do usuário.' });
    }
};

// Função para deletar usuário
exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID da URL

    try {
        const user = await User.findByPk(id); // Busca o usuário pelo ID
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await user.destroy(); // Deleta o usuário
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });

        // Registrar a atividade de deleção
        logActivity(user.id, 'Deletou usuário', 'Conta de Usuário');
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar o usuário.' });
    }
};

