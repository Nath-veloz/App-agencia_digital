import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ActivityPage from './pages/ActivityPage'; // Já existente
import ActivityLog from './components/ActivityLog';
import HomePage from './pages/HomePage'; // Página principal

// Componente para rotas protegidas
const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/activity" component={ActivityPage} />
                {/* Adicione outras rotas protegidas aqui */}
            </Switch>
        </Router>
    );
}

export default App;

/*const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('../../backend/routes/userRoutes');
const activityRoutes = require('../../backend/routes/activityRoutes'); // Já existente
const authMiddleware = require('../../backend/middlewares/authMiddleware'); // Já existente

dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Rotas de Usuário
app.use('/api/users', userRoutes);

// Rotas de Atividade (protegidas)
app.use('/api/activity', authMiddleware, activityRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});*/
