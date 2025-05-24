
import { useEffect, useState } from 'react';


import CssBaseline from '@mui/material/CssBaseline';



import AppTheme from './mui/AppTheme';



import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';









const EmprestimosUsuario = (props) => {

  const [texto, setTexto] = useState(true);
  const [emprestimos, setEmprestimos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    const pegarEmprestimos = async () => {
      try {
        const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/emprestimos/${usuario._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTexto(false);

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



 const emprestimosFiltrados = emprestimos.sort((a, b) => new Date(b.dataEmprestimo) - new Date(a.dataEmprestimo));

console.log(emprestimosFiltrados);








  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

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
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'center', md: 'center' },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Meus Empréstimos
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Veja abaixo os seus empréstimos.
          </Typography>
        </Box>


        <Grid container spacing={2}>
          {emprestimosFiltrados.length === 0 && texto === false && (
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Nenhum empréstimo para este usuário.
            </Typography>
          )}
          {texto ? "Buscando empréstimos..." : ""}

          {emprestimosFiltrados.map((emprestimo, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex', minWidth: '300px' }}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  color: (!emprestimo.dataDevolucaoReal
                      ? (new Date(emprestimo.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado")
                      : "Finalizado") === "OK"? "green" : (!emprestimo.dataDevolucaoReal
                      ? (new Date(emprestimo.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado")
                      : "Finalizado") === "Finalizado" ? "gray" : "red",
                      borderColor: (!emprestimo.dataDevolucaoReal
                      ? (new Date(emprestimo.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado")
                      : "Finalizado") === "OK"? "green" : (!emprestimo.dataDevolucaoReal
                      ? (new Date(emprestimo.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado")
                      : "Finalizado") === "Finalizado" ? "gray" : "red"
                }}
              >
                <CardHeader

                  title={emprestimo.livroId.titulo}

                />
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: 'text.secondary' }}

                  >
                    Status: {!emprestimo.dataDevolucaoReal
                      ? (new Date(emprestimo.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado")
                      : "Finalizado"} <br></br>
                    Data de Empréstimo: {new Date(emprestimo.dataEmprestimo).toLocaleDateString("pt-BR", {timeZone: "UTC" })} <br></br>
                    

                    
                    Data Limite para Devolução: {new Date(emprestimo.dataDevolucaoPrevista).toLocaleDateString("pt-BR", {timeZone: "UTC" })} <br></br>
                    {emprestimo.dataDevolucaoReal ? `Data de Devolução Real: ${new Date(emprestimo.dataDevolucaoReal).toLocaleDateString("pt-BR", {timeZone: "UTC" })}` : ""}

                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >


                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>




    </AppTheme>
  )
};

export default EmprestimosUsuario;