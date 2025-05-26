
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';



import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';


import { useNavigate, useLocation } from 'react-router-dom'; // Importa componentes de roteamento


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
        // Verificar se o usuário tem empréstimos pendentes
        const responseVerificacao = await fetch(`https://biblioteca-backend-kappa.vercel.app/emprestimos-pendentes/${cpfUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let dataVerificacao;
        try {
            dataVerificacao = await responseVerificacao.json();
        } catch {
            dataVerificacao = { message: "Erro inesperado do servidor." };
        }

        if (!responseVerificacao.ok) {
            alert(dataVerificacao.mensagem || dataVerificacao.message || "Erro ao verificar empréstimos pendentes.");
            return setBotao(false);
        }

        if (dataVerificacao.length) {
            alert("Usuário possui empréstimos pendentes. Não é possível registrar um novo empréstimo.");
            return setBotao(false);
        }

        // Caso não haja empréstimos pendentes, registrar o novo empréstimo
        const responseEmprestimo = await fetch('https://biblioteca-backend-kappa.vercel.app/emprestimos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpfUsuario, cpfFuncionario, isbnLivro, dataEmprestimo, dataDevolucaoPrevista }),
        });

        let dataEmprestimo;
        try {
            dataEmprestimo = await responseEmprestimo.json();
        } catch {
            dataEmprestimo = { message: "Erro inesperado do servidor." };
        }

        if (responseEmprestimo.ok) {
            alert("Empréstimo registrado com sucesso!");
            setFormData({
                cpfUsuario: "",
                cpfFuncionario: "",
                isbnLivro: "",
                dataEmprestimo: "",
                dataDevolucaoPrevista: "",
                tipoUsuario: ""
            });
        } else {
            alert(dataEmprestimo.mensagem || dataEmprestimo.message || "Erro ao cadastrar empréstimo.");
        }
    } catch (error) {
        console.error("Erro ao processar empréstimo:", error);
        alert("Erro ao processar empréstimo. Tente novamente mais tarde.");
    } finally {
        setBotao(false);
    }
};
  return (
    
      
        <Card variant="outlined" sx= {{borderColor: 'Highlight'}}>

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
      
  
  )
};

export default CadastroEmprestimo;