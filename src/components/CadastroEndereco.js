
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

const Cadastro = (props) => {
  const { state } = useLocation();
  const nome = state?.dadosUsuario.nome;
  const usuario = state?.dadosUsuario.usuarioId;

 const [formData, setFormData] = useState(() => ({
    usuarioId: usuario, 
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
}));

  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);


  const [logradouroError, setLogradouroError] = React.useState(false);
  const [logradouroErrorMessage, setLogradouroErrorMessage] = React.useState('');
  const [numeroError, setNumeroError] = React.useState(false);
  const [numeroErrorMessage, setNumeroErrorMessage] = React.useState('');
  const [bairroError, setBairroError] = React.useState(false);
  const [bairroErrorMessage, setBairroErrorMessage] = React.useState('');
  const [cidadeError, setCidadeError] = React.useState(false);
  const [cidadeErrorMessage, setCidadeErrorMessage] = React.useState('');
  const [estadoError, setEstadoError] = React.useState(false);
  const [estadoErrorMessage, setEstadoErrorMessage] = React.useState('');
  const [cepError, setCepError] = React.useState(false);
  const [cepErrorMessage, setCepErrorMessage] = React.useState('');








  const formatarCEP = (value) => {
    value = value.replace(/\D/g, "").slice(0, 8);
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    if (name === "cep") {
      formattedValue = formatarCEP(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };






  const validateInputs = () => {
    let isValid = true;

    if (!formData.logradouro || formData.logradouro < 1 || !formData.numero || !formData.bairro || formData.bairro < 1 || !formData.cidade || formData.cidade < 1 || !formData.estado || !formData.cep) {
      setLogradouroError(true);
      setLogradouroErrorMessage('Logradouro é obrigatório.');
      setNumeroError(true);
      setNumeroErrorMessage('Número é obrigatório.');
      setBairroError(true);
      setBairroErrorMessage('Bairro é obrigatório.');
      setCidadeError(true);
      setCidadeErrorMessage('Cidade é obrigatória.');
      setEstadoError(true);
      setEstadoErrorMessage('Estado é obrigatório.');
      setCepError(true);
      setCepErrorMessage('CEP é obrigatório.');

      isValid = false;
    } else {
      setLogradouroError(false);
      setLogradouroErrorMessage('');
      setNumeroError(false);
      setNumeroErrorMessage('');
      setBairroError(false);
      setBairroErrorMessage('');
      setCidadeError(false);
      setCidadeErrorMessage('');
      setEstadoError(false);
      setEstadoErrorMessage('');
      setCepError(false);
      setCepErrorMessage('');
    }











    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBotao(true);
    console.log("Dados recebidos:", formData);
    if (validateInputs()) {
      const { usuarioId, logradouro, numero, complemento, bairro, cidade, estado, cep } = formData;

      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/enderecos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuarioId, logradouro, numero, complemento, bairro, cidade, estado, cep }),
        });

        // Tenta converter a resposta para JSON, mas captura erros caso falhe
        let data;
        try {
          data = await response.json();
        } catch {
          data = { message: "Erro inesperado do servidor." };
        }

        if (response.ok) {
          alert("Endereço registrado com sucesso!");
          setFormData({
            usuarioId: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: ""
          });
          setBotao(false);
          navigate("/login");
        } else {
          alert(data.mensagem || data.message || "Erro ao cadastrar endereço.");
          setBotao(false);
        }
      } catch (error) {
        console.error("Erro ao cadastrar endereço:", error);
        alert("Erro ao cadastrar endereço. Tente novamente mais tarde.");
      }
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
            Cadastro de Endereço
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{
              width: '100%',
              fontSize: 'clamp(1rem, 6vw, 1rem)',
              color: '#00caf8',
            }}
          >
            {nome ? `Olá, ${nome}!` : 'Olá, Usuário!'}
            {usuario ? ` ID: ${usuario}` : ''}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <FormControl>
              <FormLabel htmlFor="logradouro">Logradouro:</FormLabel>
              <TextField
                autoComplete="logradouro"
                name="logradouro"
                required
                fullWidth
                id="logradouro"
                placeholder="Vila do Clã Nara"
                value={formData.logradouro}
                onChange={handleChange}
                error={logradouroError}
                helperText={logradouroErrorMessage}
                color={logradouroError ? 'error' : 'primary'}

              />
            </FormControl>


            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="numero">Número:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="numero"
                  placeholder="24"
                  name="numero"
                  autoComplete="numero"
                  variant="outlined"
                  value={formData.numero}
                  onChange={handleChange}
                  error={numeroError}
                  helperText={numeroErrorMessage}
                  color={numeroError ? 'error' : 'primary'}

                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="bairro">Bairro:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="bairro"
                  placeholder="Distrito Leste"
                  name="bairro"
                  autoComplete="bairro"

                  variant="outlined"
                  value={formData.bairro}
                  onChange={handleChange}
                  error={bairroError}
                  helperText={bairroErrorMessage}
                  color={bairroError ? 'error' : 'primary'}

                />
              </FormControl>





            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="complemento">Complemento:</FormLabel>
                <TextField
                  autoComplete="complemento"
                  name="complemento"
                  required
                  fullWidth
                  id="complemento"
                  placeholder="Floresta Ancestral"
                  value={formData.complemento}
                  onChange={handleChange}


                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cidade">Cidade:</FormLabel>
                <TextField
                  autoComplete="cidade"
                  name="cidade"
                  required
                  fullWidth
                  id="cidade"
                  placeholder="Vila Oculta da Folha"
                  value={formData.cidade}
                  onChange={handleChange}
                  error={cidadeError}
                  helperText={cidadeErrorMessage}
                  color={cidadeError ? 'error' : 'primary'}


                />
              </FormControl>






            </Box>





            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="cep">CEP:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="cep"
                  placeholder="XXXXX-XXX"
                  name="cep"
                  autoComplete="cep"
                  variant="outlined"
                  value={formData.cep}
                  onChange={handleChange}
                  error={cepError}
                  helperText={cepErrorMessage}
                  color={cepError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="estado">Estado:</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="estado"
                  id="estado"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  value={formData.estado}
                  onChange={handleChange}
                  error={estadoError}
                  helperText={estadoErrorMessage}
                  color={estadoError ? 'error' : 'primary'}

                >
                  <option value="" disabled>
                    Selecione o estado
                  </option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>


                </TextField>
              </FormControl>

            </Box>










            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              color={botao ? 'secondary' : 'primary'}

            >
              {botao ? 'Cadastrando...' : 'Cadastrar Endereço'}
            </Button>
          </Box>

        </Card>
      </SignUpContainer>
    </AppTheme>
  )
};

export default Cadastro;