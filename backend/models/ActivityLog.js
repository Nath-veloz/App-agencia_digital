const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ActivityLog = db.define('ActivityLog', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    target: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'activity_logs',
    timestamps: true, // createdAt e updatedAt automáticos
    createdAt: 'created_at', // Renomeia o campo
    updatedAt: false, // Desativa updatedAt se não for necessário
});

module.exports = ActivityLog;
