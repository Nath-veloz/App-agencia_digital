import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await api.post('/users/register', formData);
            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);
            // Redireciona para a página principal ou dashboard
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro no registro.');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;

/*
import React, { useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await api.post('/users/register', formData);
            // Armazena o token no localStorage
            localStorage.setItem('token', response.data.token);
            // Redireciona para a página principal ou dashboard
            history.push('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Erro no registro.');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;*/
