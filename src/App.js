import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Home from './components/Home';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import CadastroEndereco from './components/CadastroEndereco';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-endereco" element={<CadastroEndereco />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
