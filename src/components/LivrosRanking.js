
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';





import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import { useNavigate } from 'react-router-dom'; // Importa componentes de roteamento






const LivrosRanking = (props) => {





  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [livros, setLivros] = React.useState([]);
  const [emprestimoId, setEmprestimoId] = useState(null);
  const [texto, setTexto] = useState("Buscando Livros");





  







 












  useEffect(() => {
    const pegarLivros = async () => {
      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/livros/mais-emprestados', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTexto("Livros Mais Emprestados:");
          console.log(data);
          setLivros(data.livrosMaisEmprestados);
        } else {
          console.error(data.message);
          setTexto("Falha ao buscar livros. Tente novamente mais tarde.");
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    pegarLivros();
  }, []);
  return (


    <Card variant="outlined" sx={{ borderColor: 'Highlight', display: 'flex', flexDirection: 'column' }}>

      <Typography
        component="h3"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
      >
        
        {texto}
      </Typography>


      

      <Box sx={{ display: 'flex', alignItems: 'center' , flexDirection: 'column', gap: 2 }}>
        {livros.map((livro, index) => (
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              borderColor: index == 0? "gold": index == 1? "silver": index == 2? "coral": "blue"
            }}
          >
            <CardHeader

                  title={`${index + 1}º : ${livro.titulo}`}

                  subheader={livro.autor}

                />
            <CardContent>
              Número de Empréstimos: {livro.totalEmprestimos}


            </CardContent>
            


          </Card>
        ))}


      </Box>
    </Card>


  )
};

export default LivrosRanking;