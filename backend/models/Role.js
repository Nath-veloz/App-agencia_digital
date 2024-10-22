const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Role = db.define('Role', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

/*
const Role = db.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  permissions: {
    type: DataTypes.JSON,
    allowNull: false,
  }  
}, {
  timestamps: true
});*/

module.exports = Role;