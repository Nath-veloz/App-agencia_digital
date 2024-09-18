const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Role = db.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  permissions: {
    type: DataTypes.JSON, // Permissões como JSON para guardar as permissões de forma flexível
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Role;