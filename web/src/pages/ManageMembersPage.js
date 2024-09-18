import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMembersPage = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Obter todas as funções
    axios.get('/api/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error(err));

    // Obter todos os usuários
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const assignRole = (userId, roleId) => {
    axios.post('/api/assign-role', { userId, roleId })
      .then(res => alert('Função atribuída com sucesso'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Gestão de Membros</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
            <select onChange={(e) => assignRole(user.id, e.target.value)}>
              <option value="">Atribuir Função</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageMembersPage;
