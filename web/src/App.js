import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ActivityPage from './pages/ActivityPage'; // Já existente
import HomePage from './pages/HomePage'; // Página principal

// Componente para rotas protegidas
const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/activity" element={<PrivateRoute component={ActivityPage} />} />
                {/* Adicione outras rotas protegidas aqui */}
            </Routes>
        </Router>
    );
}

export default App;

/*
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ActivityPage from './pages/ActivityPage'; // Já existente
//import ActivityLog from './components/ActivityLog';
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
            <Routes>
                <Route exact path="/" component={HomePage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/activity" component={ActivityPage} />
                {Adicione outras rotas protegidas aqui}
            </Routes>
        </Router>
    );
}

export default App;*/
