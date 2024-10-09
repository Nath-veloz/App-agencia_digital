const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assumindo que a conexão com o banco está no arquivo db.js

const app = express();
const PORT =3002;

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
});
