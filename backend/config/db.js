import { createConnection } from 'mysql2';

const connection = createConnection({
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

export default connection;
