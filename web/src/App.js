const express = require('express');
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
});

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
