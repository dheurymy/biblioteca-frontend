
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';



import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './mui/AppTheme';



import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';




import AppAppBarOut from "./mui/AppAppBarOut";


const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const HomeFuncionario = (props) => {
  const navigate = useNavigate();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarOut />
      <SignUpContainer direction="column" justifyContent="space-between" marginTop={10}>
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


          <Grid container spacing={2}>



            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', minWidth: '300px' }}>
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
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'text.secondary' }}
                  >
                    Livros
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1
                  }}
                  
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='success'
                  
                  >
                    Cadastrar Livro
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='warning'
                  >
                    Alterar Livro
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='secondary'
                  >
                    Buscar Livro
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='error'
                  >
                    Deletar Livro
                  </Button>

                </Box>
              </Card>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', minWidth: '300px' }}>
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
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'text.secondary' }}
                  >
                    Usuários
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1
                  }}
                  
                >
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='warning'
                  >
                    Liberar Professor
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='warning'
                  >
                    Liberar Funcionário
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='secondary'
                  >
                    Buscar Usuário
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='error'
                  >
                    Deletar Usuário
                  </Button>

                </Box>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', minWidth: '300px' }}>
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
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'text.secondary' }}
                  >
                    Empréstimos
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 1
                  }}
                  
                >
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='success'
                  
                  >
                    Criar Empréstimo
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='warning'
                  >
                    Alterar Empréstimo
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='secondary'
                  >
                    Buscar Empréstimo
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/cadastro-livro')}
                    color='error'
                  >
                    Deletar Empréstimo
                  </Button>

                </Box>
              </Card>
            </Grid>

          </Grid>
        </Container>


      </SignUpContainer>
    </AppTheme>
  )
};

export default HomeFuncionario;