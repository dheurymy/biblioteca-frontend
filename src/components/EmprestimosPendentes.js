
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';





import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import { useNavigate } from 'react-router-dom'; // Importa componentes de roteamento






const EmprestimosPendentes = (props) => {





  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [emprestimos, setEmprestimos] = React.useState([]);
  const [emprestimoId, setEmprestimoId] = useState(null);
  const [texto, setTexto] = useState(true);





  







 












  useEffect(() => {
    const pegarEmprestimos = async () => {
      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/emprestimos/pendentes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTexto(false);
          console.log(data);
          setEmprestimos(data.emprestimos);
        } else {
          console.error(data.message);
          setTexto(true);
        }
      } catch (error) {
        console.error('Erro ao buscar emprestimos:', error);
      }
    };

    pegarEmprestimos();
  }, []);
  return (


    <Card variant="outlined" sx={{ borderColor: 'Highlight', display: 'flex', flexDirection: 'column' }}>

      <Typography
        component="h3"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
      >
        
        {texto ? "Buscando empréstimos..." : "Empréstimos Pendentes" }
      </Typography>


      

      <Box sx={{ display: 'flex', alignItems: 'center' , flexDirection: {xs: 'column', sm: 'row'}, gap: 2 }}>
        {emprestimos.map((emp, index) => (
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              borderColor: new Date(emp.dataDevolucaoPrevista) >= new Date() ? "green" : "red"
            }}
          >
            
            <CardContent>
              Usuário: {emp.usuarioId.nome} <br></br> 
              CPF: {emp.usuarioId.cpf} <br></br>
              Livro: {emp.livroId.titulo} <br></br>
              Data de Empréstimo : {new Date(emp.dataEmprestimo).toLocaleDateString("pt-BR", { timeZone: "UTC" })} <br></br>
              Data Prevista de Devolução: {new Date(emp.dataDevolucaoPrevista).toLocaleDateString("pt-BR", { timeZone: "UTC" })} <br></br>
              Status: {new Date(emp.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado"} 



            </CardContent>
            


          </Card>
        ))}


      </Box>
    </Card>


  )
};

export default EmprestimosPendentes;