require('dotenv').config({ path: __dirname + '/../.env' });

const { Sequelize } = require('sequelize');

// Inicializa a conexão com o banco de dados
const sequelize = new Sequelize(
  process.env.DB_NAME,         // Nome do banco de dados
  process.env.DB_USER,         // Usuário do banco de dados
  process.env.DB_PASSWORD,     // Senha do usuário
  {
    host: process.env.DB_HOST, // Host do banco de dados (ex: localhost)
    port: process.env.DB_PORT || 3308, // Porta do banco de dados, 3306 é a padrão do MySQL
    dialect: 'mysql',          // Especifica o tipo do banco (MySQL)
  }
);

// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();  // Testa a autenticação com o banco de dados
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}

testConnection(); // Chama a função de teste de conexão

module.exports = sequelize;


/*
require('dotenv').config();
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

module.exports = sequelize;*/