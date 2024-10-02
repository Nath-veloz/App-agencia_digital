const Role = require('../models/Role');
const User = require('../models/User');

// Criar uma nova função
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = await Role.create({ name, permissions });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as funções
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Atribuir uma função a um usuário
const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.roleId = roleId;
    await user.save();

    res.status(200).json({ message: 'Função atribuída com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createRole, getRoles, assignRoleToUser };


/*
const Role = require('../models/Role');

// Criar uma nova função
const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const role = await Role.create({ name, permissions });  // Criar um novo papel
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as funções
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();  // Sequelize método para pegar todos os papéis
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createRole, getRoles };*/

/*
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

module.exports = { createRole, getRoles };*/
