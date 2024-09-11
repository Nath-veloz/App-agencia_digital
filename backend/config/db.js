const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1:3308',
    user: 'app_user_01',
    password: 'password123',
    database: 'app_agencia_digital'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
