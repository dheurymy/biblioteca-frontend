
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';











export default function Testimonials() {



  const [livros, setLivros] = useState([]);

   useEffect(() => {
      const pegarLivros = async () => {
        try {
          const response = await fetch('https://biblioteca-backend-kappa.vercel.app/livros', {
            method: 'GET',
            headers: {
              
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (response.ok) {
            console.log(data);
            setLivros(data.livros);
          } else {
            console.error(data.message);
            
          }
        } catch (error) {
          console.error('Erro ao buscar livros:', error);
        }
      };
  
      pegarLivros();
      console.log(livros);
    });

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Acervo de Livros
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Veja abaixo os livros disponíveis no nosso acervo.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {livros.map((livro, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  Autoria: {livro.autor} &nbsp;&nbsp;&nbsp;&nbsp; Ano: {livro.anoPublicacao}<br></br> 
                  Gênero: {livro.genero} &nbsp;&nbsp;&nbsp;&nbsp; Editora: {livro.editora} 
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  
                  title={livro.titulo}
                  
                  subheader={livro.quantidade > 1 ? 'Status: Disponível' : 'Status: Somente Consulta'}
                  
                />
               
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
