import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/users/login', formData);
            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);
            // Redireciona para a página principal ou dashboard
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro no login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginForm;

/*
import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/users/login', formData);
            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);
            // Redireciona para a página principal ou dashboard
            history.push('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro no login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginForm;*/