const Role = require('../models/Role');

// Criar uma nova função
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as funções
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createRole, getRoles };
