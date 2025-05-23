import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';



import Home from './components/Home';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import CadastroEndereco from './components/CadastroEndereco';
import CadastroLivro from './components/CadastroLivro';
import ListaLivros from './components/ListaLivros';
import HomeUsuario from './components/HomeUsuario';
import CadastroFuncionario from './components/CadastroFuncionario';
import CadastroEmprestimo from './components/CadastroEmprestimo';


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
          <Route path="/lista-livros-usuario" element={<ListaLivros />} />
          <Route path='/home' element={<HomeUsuario/>}/>
          <Route path='/funcionario' element={<CadastroFuncionario/>}/>
          <Route path='/emprestimo' element={<CadastroEmprestimo/>}/>
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
