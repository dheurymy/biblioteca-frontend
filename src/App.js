import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';



import Home from './components/Home';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import CadastroEndereco from './components/CadastroEndereco';
import CadastroLivro from './components/CadastroLivro';
import ListaLivros from './components/ListaLivros';
import HomeFuncionario from './components/HomeFuncionario';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-endereco" element={<CadastroEndereco />} />
          <Route path="/cadastro-livro" element={<CadastroLivro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lista-livros" element={<ListaLivros />} />
          <Route path='/funcionario' element={<HomeFuncionario/>}/>
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
