const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Role = require('./Role'); // Adiciona a referência ao modelo de Role

const User = db.define('User', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  name: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
  },
  password: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  roleId: {  // Certifique-se que é roleId e não role_id
      type: DataTypes.INTEGER,
      allowNull: true,
  },
  createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  },
  updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'users', // Garante que ele usa a tabela correta
  underscored: false, // Impede a conversão para snake_case
});

module.exports = User;

/*
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Role = require('./Role'); // Adiciona a referência ao modelo de Role

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

User.belongsTo(Role, { foreignKey: 'roleId' }); // Define a relação com o modelo de Role

module.exports = User;*/

/*const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = User;*/