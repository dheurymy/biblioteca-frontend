
import { useState } from "react";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../components/mui/AppTheme';

import AppAppBar from "./mui/AppAppBar";


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

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

const Login = (props) => {

  const [formData, setFormData] = useState({

    cpf: "",

    senha: "",

  });

  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  };

  const handleChange = (event) => {
        const { name, value } = event.target;
        let formattedValue = value;
        if (name === "cpf") {
          formattedValue = formatarCPF(value);
        } 
        setFormData((prevData) => ({
          ...prevData,
          [name]: formattedValue,
        }));
      };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, email, cpf, telefone, senha, tipoUsuario } = formData;

    try {
      const response = await fetch('https://biblioteca-backend-kappa.vercel.app/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, cpf, telefone, senha, tipoUsuario }),
      });

      // Tenta converter a resposta para JSON, mas captura erros caso falhe
      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Erro inesperado do servidor." };
      }

      if (response.ok) {
        alert("Login efetuado com sucesso!");
      } else {
        alert(data.mensagem || data.message || "Erro ao logar usuário.");
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao logar usuário. Tente novamente mais tarde.");
    }

  };
  return (
    <AppTheme {...props}>
      <AppAppBar />
      <CssBaseline enableColorScheme />
      
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">

          <Typography
            component="h3"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >








            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor="cpf">CPF:</FormLabel>
              <TextField
                required
                fullWidth
                id="cpf"
                placeholder="XXX.XXX.XXX-XX"
                name="cpf"
                autoComplete="cpf"
                onChange={handleChange}
                variant="outlined"
                value={formData.cpf}
                
              />
            </FormControl>





            <FormControl>
              <FormLabel htmlFor="senha">Senha:</FormLabel>
              <TextField
                required
                fullWidth
                name="senha"
                placeholder="••••••"
                type="password"
                id="senha"
                value={formData.senha}
                onChange={handleChange}

                autoComplete="new-senha"
                variant="outlined"

              />
            </FormControl>







            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Entrar
            </Button>
          </Box>
          
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
};

export default Login  ;