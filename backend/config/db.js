const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Verificar se a porta está sendo usada corretamente
    dialect: 'mysql',
  }
);

module.exports = sequelize;


/*const mysql = require('mysql2');

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
/*
const {Sequelize} = require('sequelize');
const db = new Sequelize('app_agencia_digital', 'app_user_01', 'password123', {
    host: '127.0.0.1:3308',
    dialect: 'mysql'
});

module.exports = db;*/