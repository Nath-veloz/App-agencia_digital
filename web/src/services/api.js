import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Ajuste a URL conforme necessário
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
