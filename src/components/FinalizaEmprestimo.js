
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';



import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import { useNavigate, useLocation } from 'react-router-dom'; // Importa componentes de roteamento






const FinalizaEmprestimo = (props) => {
  const { state } = useLocation();




  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [emprestimo, setEmprestimo] = React.useState([]);
  const [emprestimoId, setEmprestimoId] = useState(null);


  useEffect(() => {
    if (emprestimo.length > 0) {
      setEmprestimoId(emprestimo[0]._id);
    }
  }, [emprestimo]);



  const [formData, setFormData] = useState(() => ({
    cpfUsuario: ""
  }));







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
    if (name === "cpfUsuario") {
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

    const { cpfUsuario } = formData;



    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/emprestimos-pendentes/${cpfUsuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Erro inesperado do servidor." };
      }

      if (response.ok) {
        
        setEmprestimo(data);

        console.log(emprestimo);
        if(!data.length) {
          alert("Não foram encontrados empréstimos pendentes para o usuário");
        } else {
          alert("Usuário verificado com sucesso!");
          setToggle(true);
        };

      } else {
        alert(data.mensagem || data.message || "Erro ao finalizar emprestimo.");

      }
    } catch (error) {
      console.error("Erro ao finalizar emprestimo:", error);
      alert("Erro ao finalizar emprestimo. Tente novamente mais tarde.");
    } finally {
      setBotao(false);
    }
  };

  const handleSubmitFinal = async (event) => {
    event.preventDefault();
    setBotao(true);
    




    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/emprestimos/finalizar/${emprestimoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Erro inesperado do servidor." };
      }

      if (response.ok) {
        alert("Emprestimo finalizado com sucesso!");
        setEmprestimo([]);
       
        setToggle(false);

      } else {
        alert(data.mensagem || data.message || "Erro ao finalizar emprestimo.");

      }
    } catch (error) {
      console.error("Erro ao finalizar emprestimo:", error);
      alert("Erro ao finalizar emprestimo. Tente novamente mais tarde.");
    } finally {
      setBotao(false);
    }
  };
  return (


    <Card variant="outlined" sx={{ borderColor: 'Highlight', display: 'flex', flexDirection: 'column' }}>

      <Typography
        component="h3"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(1rem, 8vw, 1.5rem)' }}
      >
        Finalização de Empréstimo
      </Typography>


      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: toggle ? 'none' : 'flex', flexDirection: 'column', gap: 1 }}
      >
        <FormControl>
          <FormLabel htmlFor="cpfUsuario">CPF do Usuário:</FormLabel>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={botao ? 'secondary' : 'primary'}
        >
          {botao ? 'Verificando...' : 'Verificar Usuário'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
        {emprestimo.map((emp, index) => (
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              borderColor: new Date(emp.dataDevolucaoPrevista) >= new Date() ? "green" : "red"
            }}
          >
            <CardHeader
              title={emp.usuarioId.nome}
              subheader={`CPF: ${emp.usuarioId.cpf}`}

            />
            <CardContent>
              Livro: {emp.livroId.titulo} <br></br>
              Data de Empréstimo : {new Date(emp.dataEmprestimo).toLocaleDateString("pt-BR", { timeZone: "UTC" })} <br></br>
              Data Prevista de Devolução: {new Date(emp.dataDevolucaoPrevista).toLocaleDateString("pt-BR", { timeZone: "UTC" })} <br></br>
              Status: {new Date(emp.dataDevolucaoPrevista) >= new Date() ? "OK" : "Atrasado"} <br></br>
              ID: {emp._id}



            </CardContent>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color={botao ? 'secondary' : 'primary'}
              onClick={handleSubmitFinal}

            >
              {botao ? 'Finalizando...' : 'Finalizar Empréstimo'}
            </Button>



          </Card>
        ))}


      </Box>
    </Card>


  )
};

export default FinalizaEmprestimo;