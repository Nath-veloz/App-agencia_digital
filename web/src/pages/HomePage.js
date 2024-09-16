import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div>
            <h1>Bem-vindo à Agência Digital</h1>
            {isAuthenticated ? (
                <div>
                    <Link to="/activity">Ver Histórico de Atividades</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registrar-se</Link>
                </div>
            )}
        </div>
    );
};

export default HomePage;
