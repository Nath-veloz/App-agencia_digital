require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Certifique-se de que o caminho está correto para a conexão do banco de dados

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Import routes (adicione suas rotas aqui)
const userRoutes = require('../routes/userRoutes'); // Certifique-se de que o caminho está correto
app.use('/api/users', userRoutes); // Use '/api/users' para rotas relacionadas a usuários

// Start server
app.listen(PORT, async () => {
    try {
        await db.authenticate();  // Verifica se a conexão com o banco está funcionando
        console.log('Database connected');

        // Sincroniza o modelo com o banco de dados
        await db.sync({ alter: true });  // <-- Alinhando modelos com tabelas
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server is running on port ${PORT}`);
});


/*
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assumindo que a conexão com o banco está no arquivo db.js

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Import routes (adicione suas rotas aqui)
const userRoutes = require('../routes/userRoutes');
app.use('/api', userRoutes);

// Start server
app.listen(PORT, async () => {
    try {
        await db.authenticate();  // Verifica se a conexão com o banco está funcionando
        console.log('Database connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server is running on port ${PORT}`);
});*/