
import React, { useState, useEffect } from "react";
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


import { useNavigate, useLocation } from 'react-router-dom'; // Importa componentes de roteamento

import AppAppBarOut from "./mui/AppAppBarOut";

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

const CadastroEmprestimo = (props) => {
  const { state } = useLocation();
  



  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);


  const [formData, setFormData] = useState(() => ({
    cpfUsuario: "",
    cpfFuncionario: "",
    isbnLivro: "",
    dataEmprestimo: new Date().toISOString().split("T")[0],
    dataDevolucaoPrevista: "",
    tipoUsuario: ""
  }));

  useEffect(() => {
    if (formData.dataEmprestimo && formData.tipoUsuario) {
      let dataDevolucaoPrevista = new Date(formData.dataEmprestimo);

      if (formData.tipoUsuario === "aluno") {
        dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 7);
      } else if (formData.tipoUsuario === "professor") {
        dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 30);
      }

      // Atualiza o estado com a nova data prevista
      setFormData(prevState => ({
        ...prevState,
        dataDevolucaoPrevista: dataDevolucaoPrevista.toISOString().split("T")[0] // Formata para YYYY-MM-DD
      }));
    }
  }, [formData.dataEmprestimo, formData.tipoUsuario]);





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
    if (name === "cpfUsuario" | name === "cpfFuncionario") {
      formattedValue = formatarCPF(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };







  const handleSubmit = async (event) => {
    event.preventDefault();
    setBotao(true);
    console.log("Dados recebidos:", formData);

    const { cpfUsuario, cpfFuncionario, isbnLivro, dataEmprestimo, dataDevolucaoPrevista } = formData;




    try {
      const response = await fetch('https://biblioteca-backend-kappa.vercel.app/emprestimos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpfUsuario, cpfFuncionario, isbnLivro, dataEmprestimo, dataDevolucaoPrevista }),
      });

      // Tenta converter a resposta para JSON, mas captura erros caso falhe
      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Erro inesperado do servidor." };
      }

      if (response.ok) {
        alert("Emprestimo registrado com sucesso!");
        setFormData({
          cpfUsuario: "",
          cpfFuncionario: "",
          isbnLivro: "",
          dataEmprestimo: "",
          dataDevolucaoPrevista: "",
          tipoUsuario: ""
        });
        setBotao(false);
        
      } else {
        alert(data.mensagem || data.message || "Erro ao cadastrar empréstimo.");
        setBotao(false);
      }
    } catch (error) {
      console.error("Erro ao cadastrar emprestimo:", error);
      alert("Erro ao cadastrar emprestimo. Tente novamente mais tarde.");
    }

  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBarOut />
      <SignUpContainer direction="column" justifyContent="space-between" marginTop={10}>
        <Card variant="outlined">

          <Typography
            component="h3"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
          >
            Cadastro de Empréstimo
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: "column", md: 'row' } }}>
              <FormControl>
                <FormLabel htmlFor="cpfUsuario">CPF do Usuario:</FormLabel>
                <TextField
                  autoComplete="cpfUsuario"
                  name="cpfUsuario"
                  required
                  fullWidth
                  id="cpfUsuario"
                  placeholder="XXX.XXX.XXX-XX"
                  value={formData.cpfUsuario}
                  onChange={handleChange}


                />
              </FormControl>



              <FormControl>
                <FormLabel htmlFor="cpfFuncionario">CPF do Funcionário:</FormLabel>
                <TextField
                  autoComplete="cpfFuncionario"
                  name="cpfFuncionario"
                  required
                  fullWidth
                  id="cpfFuncionario"
                  placeholder="XXX.XXX.XXX-XX"
                  value={formData.cpfFuncionario}
                  onChange={handleChange}


                />
              </FormControl>
            </Box>

            <FormControl>
              <FormLabel htmlFor="isbnLivro">ISBN do Livro:</FormLabel>
              <TextField
                autoComplete="isbnLivro"
                name="isbnLivro"
                required
                fullWidth
                id="isbnLivro"
                placeholder="XXXXXXXX"
                value={formData.isbnLivro}
                onChange={handleChange}


              />
            </FormControl>














            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: "column", md: 'row' } }}>
              <FormControl>
                <FormLabel htmlFor="dataEmprestimo">Data do Empréstimo:</FormLabel>
                <TextField
                  autoComplete="dataEmprestimo"
                  name="dataEmprestimo"
                  required
                  fullWidth
                  type="date"
                  id="dataEmprestimo"
                  placeholder="XX/XX/XXXX"
                  value={formData.dataEmprestimo}
                  onChange={handleChange}


                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="tipoUsuario">Tipo de Usuário:</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="tipoUsuario"
                  id="tipoUsuario"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  value={formData.tipoUsuario}
                  onChange={handleChange}


                >
                  <option value="" disabled>
                    Selecione o usuário
                  </option>
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>



                </TextField>
              </FormControl>






            </Box>













            <Button
              type="submit"
              fullWidth
              variant="contained"

              color={botao ? 'secondary' : 'primary'}

            >
              {botao ? 'Cadastrando...' : 'Cadastrar Empréstimo'}
            </Button>
          </Box>

        </Card>
      </SignUpContainer>
    </AppTheme>
  )
};

export default CadastroEmprestimo;