import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityLog = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Recupera o token JWT do localStorage
        const token = localStorage.getItem('token');
        
        axios.get('/api/activity/history', {
            headers: {
                Authorization: token // Adiciona o token no cabeçalho da requisição
            }
        })
        .then(response => {
            setActivities(response.data);
        })
        .catch(error => {
            setError('Erro ao buscar histórico de atividades.');
            console.error(error);
        });
    }, []);

    return (
        <div>
            <h2>Histórico de Atividades</h2>
            {error && <p>{error}</p>}
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        {activity.user_name} {activity.action} em {activity.target} - {new Date(activity.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog;