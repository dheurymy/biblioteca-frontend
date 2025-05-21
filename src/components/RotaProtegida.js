import { Navigate } from 'react-router-dom';

const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtém o token armazenado

  if (!token) {
    alert("Você precisa estar logado para acessar esta página."); // Exibe alerta de que o usuário precisa estar logado
    
    // Redireciona para a página de login se não houver token
    return <Navigate to="/login" />;
  }

  return children; // Se tiver token, exibe o conteúdo protegido
};

export default RotaProtegida;