
import React, { useState } from "react";
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
import AppTheme from './mui/AppTheme';

import AppAppBarOut from "./mui/AppAppBarOut";

import { useNavigate } from 'react-router-dom'; // Importa componentes de roteamento

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
    width: '600px',
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



const CadastroFuncionario = (props) => {

  

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmaSenha: "",
  });

  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  const [nomeError, setNomeError] = React.useState(false);
  const [nomeErrorMessage, setNomeErrorMessage] = React.useState('');

  const [senhaError, setSenhaError] = React.useState(false);
  const [senhaErrorMessage, setSenhaErrorMessage] = React.useState('');
  const [confirmaSenhaError, setConfirmaSenhaError] = React.useState(false);
  const [confirmaSenhaErrorMessage, setConfirmaSenhaErrorMessage] = React.useState('');



  const formatarCPF = (value) => {
    value = value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  };
  const formatarTelefone = (value) => {
    value = value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === "cpf") {
      formattedValue = formatarCPF(value);
    } else if (name === "telefone") {
      formattedValue = formatarTelefone(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };






  const validateInputs = () => {
    let isValid = true;

    if (!formData.nome || formData.nome.length < 1) {
      setNomeError(true);
      setNomeErrorMessage('Nome é obrigatório.');
      isValid = false;
    } else {
      setNomeError(false);
      setNomeErrorMessage('');
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor, insira um email válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }





    if (!formData.senha) {
      setSenhaError(true);
      setSenhaErrorMessage('Senha é obrigatória.');
      isValid = false;
    } else if (formData.senha.length < 6) {
      setSenhaError(true);
      setSenhaErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      isValid = false;
    } else {
      setSenhaError(false);
      setSenhaErrorMessage('');
    }

    if (!formData.confirmaSenha) {
      setConfirmaSenhaError(true);
      setConfirmaSenhaErrorMessage('Confirmação de senha é obrigatória.');
      isValid = false;
    } else if (formData.confirmaSenha !== formData.senha) {
      setConfirmaSenhaError(true);
      setConfirmaSenhaErrorMessage('As senhas não coincidem.');
      isValid = false;
    } else {
      setConfirmaSenhaError(false);
      setConfirmaSenhaErrorMessage('');
    }






    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBotao(true);
    if (validateInputs()) {
      const { nome, email, cpf, telefone, senha} = formData;

      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/funcionarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, email, cpf, telefone, senha }),
        });

        // Tenta converter a resposta para JSON, mas captura erros caso falhe
        let data;
        try {
          data = await response.json();
        } catch {
          data = { message: "Erro inesperado do servidor." };
        }

        if (response.ok) {
          alert(`Funcionário registrado com sucesso!`);
          setBotao(false);
          setFormData({
            nome: "",
            email: "",
            cpf: "",
            telefone: "",
            senha: "",
            confirmaSenha: "",
            
          });
          navigate('/home-funcionario');
        } else {
          alert(data.mensagem || data.message || "Erro ao registrar Funcionário.");
          setBotao(false);
        }
      } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Erro ao registrar Funcionário. Tente novamente mais tarde.");
        setBotao(false);
      }
    }
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarOut />
      <SignUpContainer direction="column" justifyContent="space-between" marginTop={12}>
        <Card variant="outlined" >

          <Typography
            component="h3"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
          >
            Cadastro de Funcionário
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <FormControl>
              <FormLabel htmlFor="nome">Nome completo:</FormLabel>
              <TextField
                autoComplete="nome"
                name="nome"
                required
                fullWidth
                id="nome"
                placeholder="Shikamaru Nara"
                value={formData.nome}
                onChange={handleChange}
                error={nomeError}
                helperText={nomeErrorMessage}
                color={nomeError ? 'error' : 'primary'}

              />
            </FormControl>


          
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="email">E-mail:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="8hokage@konoha.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? 'error' : 'primary'}

                />
              </FormControl>

              






            <Box sx={{ display: 'flex', gap: 2, flexDirection:{xs: "column", sm: "row"} }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="cpf">CPF:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  placeholder="XXX.XXX.XXX-XX"
                  name="cpf"
                  autoComplete="cpf"
                  variant="outlined"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="telefone">Telefone:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="telefone"
                  placeholder="(XX) XXXXX-XXXX"
                  name="telefone"
                  autoComplete="telefone"
                  variant="outlined"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>



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
                error={senhaError}
                helperText={senhaErrorMessage}
                color={senhaError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmaSenha">Confirme a senha:</FormLabel>
              <TextField
                required
                fullWidth
                name="confirmaSenha"
                placeholder="••••••"
                type="password"
                id="confirmaSenha"
                autoComplete="new-confirmaSenha"
                variant="outlined"
                value={formData.confirmaSenha}
                onChange={handleChange}
                error={confirmaSenhaError}
                helperText={confirmaSenhaErrorMessage}
                color={confirmaSenhaError ? 'error' : 'primary'}
              />
            </FormControl>






            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              color={botao ? 'secondary' : 'primary'}
              

            >
              {botao ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Box>
          
        </Card>
      </SignUpContainer>
    </AppTheme>
  )
};

export default CadastroFuncionario;