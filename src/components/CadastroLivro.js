
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


  const [formData, setFormData] = useState(() => ({
    titulo: "",
    autor: "",
    editora: "",
    anoPublicacao: "",
    genero: "",
    isbn: "",
    localizacao: "",
    quantidade: ""
  }));

  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);

  const [tituloError, setTituloError] = React.useState(false);
  const [tituloErrorMessage, setTituloErrorMessage] = React.useState('');
  const [autorError, setAutorError] = React.useState(false);
  const [autorErrorMessage, setAutorErrorMessage] = React.useState('');
  const [editoraError, setEditoraError] = React.useState(false);
  const [editoraErrorMessage, setEditoraErrorMessage] = React.useState('');
  const [anoPublicacaoError, setAnoPublicacaoError] = React.useState(false);
  const [anoPublicacaoErrorMessage, setAnoPublicacaoErrorMessage] = React.useState('');
  const [generoError, setGeneroError] = React.useState(false);
  const [generoErrorMessage, setGeneroErrorMessage] = React.useState('');
  const [isbnError, setIsbnError] = React.useState(false);
  const [isbnErrorMessage, setIsbnErrorMessage] = React.useState('');
  const [quantidadeError, setQuantidadeError] = React.useState(false);
  const [quantidadeErrorMessage, setQuantidadeErrorMessage] = React.useState('');
  const [localizacaoError, setLocalizacaoError] = React.useState(false);
  const [localizacaoErrorMessage, setLocalizacaoErrorMessage] = React.useState('');



  const validateInputs = () => {
    let isValid = true;

    if (!formData.titulo || formData.titulo < 1) {
      setTituloError(true);
      setTituloErrorMessage('Título é obrigatório.');
      isValid = false;
    } else {
      setTituloError(false);
      setTituloErrorMessage('');
    }
    if (!formData.autor || formData.autor < 1) {
      setAutorError(true);
      setAutorErrorMessage('Autor é obrigatório.');
      isValid = false;
    } else {
      setAutorError(false);
      setAutorErrorMessage('');
    }
    if (!formData.editora || formData.editora < 1) {
      setEditoraError(true);
      setEditoraErrorMessage('Editora é obrigatória.');
      isValid = false;
    } else {
      setEditoraError(false);
      setEditoraErrorMessage('');
    }
    if (!formData.anoPublicacao || formData.anoPublicacao < 1) {
      setAnoPublicacaoError(true);
      setAnoPublicacaoErrorMessage('Ano de publicação é obrigatório.');
      isValid = false;
    } else {
      setAnoPublicacaoError(false);
      setAnoPublicacaoErrorMessage('');
    }
    if (!formData.genero || formData.genero < 1) {
      setGeneroError(true);
      setGeneroErrorMessage('Gênero é obrigatório.');
      isValid = false;
    } else {
      setGeneroError(false);
      setGeneroErrorMessage('');
    }
    if (!formData.isbn || formData.isbn < 1) {
      setIsbnError(true);
      setIsbnErrorMessage('ISBN é obrigatório.');
      isValid = false;
    } else {
      setIsbnError(false);
      setIsbnErrorMessage('');
    }


    if (!formData.quantidade || formData.quantidade < 1) {
      setQuantidadeError(true);
      setQuantidadeErrorMessage('Quantidade é obrigatória.');
      isValid = false;
    } else {
      setQuantidadeError(false);
      setQuantidadeErrorMessage('');
    }

    if (!formData.localizacao) {
      setLocalizacaoError(true);
      setLocalizacaoErrorMessage('Localização é obrigatória.');
      isValid = false;
    } else {
      setLocalizacaoError(false);
      setLocalizacaoErrorMessage('');
    }


    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBotao(true);
    console.log("Dados recebidos:", formData);
    if (validateInputs()) {
      const { titulo, autor, editora, anoPublicacao, genero, isbn, localizacao,  quantidade } = formData;

      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/livros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo, autor, editora, anoPublicacao, genero, isbn, localizacao, quantidade }),
        });

        // Tenta converter a resposta para JSON, mas captura erros caso falhe
        let data;
        try {
          data = await response.json();
        } catch {
          data = { message: "Erro inesperado do servidor." };
        }

        if (response.ok) {
          alert("Livro registrado com sucesso!");
          setFormData({
            titulo: "",
            autor: "",
            editora: "",
            anoPublicacao: "",
            genero: "",
            isbn: "",
            quantidade: "",
            localizacao: "",
          });
          setBotao(false);
          navigate("/cadastro-livro");
        } else {
          alert(data.mensagem || data.message || "Erro ao cadastrar livro.");
          setBotao(false);
        }
      } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
        alert("Erro ao cadastrar livro. Tente novamente mais tarde.");
      }
    }
  };
  return (
    
      
        <Card variant="outlined" sx={{borderColor: 'Highlight'}}>

          <Typography
            component="h3"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
          >
            Cadastro de Livros
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <FormControl>
              <FormLabel htmlFor="titulo">Título:</FormLabel>
              <TextField
                autoComplete="titulo"
                name="titulo"
                required
                fullWidth
                id="titulo"
                placeholder="Percy Jackson e o Ladrão de Raios"
                value={formData.titulo}
                onChange={handleChange}

                error={tituloError}
                helperText={tituloErrorMessage}
                color={tituloError ? 'error' : 'primary'}

              />
            </FormControl>


            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="autor">Autor:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="autor"
                  placeholder="Rick Riordan"
                  name="autor"
                  autoComplete="autor"
                  variant="outlined"
                  value={formData.autor}
                  onChange={handleChange}

                  error={autorError}
                  helperText={autorErrorMessage}
                  color={autorError ? 'error' : 'primary'}

                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="editora">Editora:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="editora"
                  placeholder="Abril"
                  name="editora"
                  autoComplete="editora"

                  variant="outlined"
                  value={formData.editora}
                  onChange={handleChange}

                  error={editoraError}
                  helperText={editoraErrorMessage}
                  color={editoraError ? 'error' : 'primary'}

                />
              </FormControl>





            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="genero">Gênero:</FormLabel>
                <TextField
                  autoComplete="genero"
                  name="genero"
                  required
                  fullWidth
                  id="genero"
                  placeholder="Fantasia"
                  value={formData.genero}
                  onChange={handleChange}
                  error={generoError}
                  helperText={generoErrorMessage}
                  color={generoError ? 'error' : 'primary'}





                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="anoPublicacao">Publicação:</FormLabel>
                <TextField
                  autoComplete="anoPublicacao"
                  name="anoPublicacao"
                  required
                  type="number"
                  fullWidth
                  id="anoPublicacao"
                  placeholder="2012"
                  value={formData.anoPublicacao}
                  onChange={handleChange}

                  error={anoPublicacaoError}
                  helperText={anoPublicacaoErrorMessage}
                  color={anoPublicacaoError ? 'error' : 'primary'}


                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="localizacao">Localização:</FormLabel>
                <TextField
                  autoComplete="localizacao"
                  name="localizacao"
                  required
                  fullWidth
                  id="localizacao"
                  placeholder="H2"
                  value={formData.localizacao}
                  onChange={handleChange}
                  error={localizacaoError}
                  helperText={localizacaoErrorMessage}
                  color={localizacaoError ? 'error' : 'primary'}





                />
              </FormControl>






            </Box>





            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="isbn">ISBN:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="isbn"
                  placeholder="XXXXXXXXXX"
                  name="isbn"
                  autoComplete="isbn"

                  value={formData.isbn}
                  onChange={handleChange}

                  error={isbnError}
                  helperText={isbnErrorMessage}
                  color={isbnError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="quantidade">Quantidade:</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="quantidade"
                  placeholder="25"
                  name="quantidade"
                  type="number"
                  autoComplete="quantidade"
                  onChange={handleChange}

                  value={formData.quantidade}

                  error={quantidadeError}
                  helperText={quantidadeErrorMessage}
                  color={quantidadeError ? 'error' : 'primary'}
                />
              </FormControl>



            </Box>










            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              color={botao ? 'secondary' : 'primary'}

            >
              {botao ? 'Cadastrando...' : 'Cadastrar Livro'}
            </Button>
          </Box>

        </Card>
      
   
  )
};

export default Cadastro;