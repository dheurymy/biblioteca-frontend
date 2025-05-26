
import React, { useState } from "react";
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';



import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import { useNavigate, useLocation } from 'react-router-dom'; // Importa componentes de roteamento






const AlterarLivro = (props) => {
  const { state } = useLocation();




  const navigate = useNavigate();

  const [botao, setBotao] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [livro, setLivro] = React.useState("");






  const [formData, setFormData] = useState(() => ({
    isbnLivro: "",
    quantidade: ""
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

    const { isbnLivro } = formData;



    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/livros/quantidade/${isbnLivro}`, {
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
        console.log(data);

        setLivro(data);

        

        alert("Livro verificado com sucesso!");
        setToggle(true);


      } else {
        alert(data.mensagem || data.message || "Erro ao verificar livro.");

      }
    } catch (error) {
      console.error("Erro ao verificar livro:", error);
      alert("Erro ao verificar livro. Tente novamente mais tarde.");
    } finally {
      setBotao(false);
      
    }
  };

  const handleSubmitFinal = async (event) => {
    event.preventDefault();
    setBotao(true);
    console.log("Dados recebidos:", formData);
    const { isbnLivro, quantidade } = formData;



    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/livros/quantidade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isbn: isbnLivro,
          novaQuantidade: quantidade
        })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Erro inesperado do servidor." };
      }

      if (response.ok) {
        alert("Quantidade alterada com sucesso!");


        setToggle(false);

      } else {
        alert(data.mensagem || data.message || "Erro ao alterar quantidade.");

      }
    } catch (error) {
      console.error("Erro ao alterar quantidade:", error);
      alert("Erro ao alterar quantidade. Tente novamente mais tarde.");
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
        Alterar Quantidade Livro
      </Typography>


      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: toggle ? 'none' : 'flex', flexDirection: 'column', gap: 1 }}
      >
        <FormControl>
          <FormLabel htmlFor="isbnLivro">ISBN do Livro:</FormLabel>
          <TextField
            autoComplete="isbnLivro"
            name="isbnLivro"
            required
            fullWidth
            id="isbnLivro"
            placeholder="XXXXXXXXXXXX"
            value={formData.isbnLivro}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={botao ? 'secondary' : 'primary'}
        >
          {botao ? 'Verificando...' : 'Verificar Livro'}
        </Button>
      </Box>
      <Box sx={{ display: toggle ? 'flex' : 'none', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
        
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              borderColor: 'Highlight',
            }}
          >
            <CardHeader
              title={livro.titulo}
              

            />
            <CardContent>
              Autor: {livro.autor} <br />
              ISBN: {livro.isbn} <br />
              Quantidade Disponível: {livro.quantidadeDisponivel} <br />  
              Quantidade Emprestada: {livro.quantidadeEmprestada} <br />
              Quantidade Total: {livro.quantidadeDisponivel + livro.quantidadeEmprestada} <br />



            </CardContent>
            
              <FormControl>
                <FormLabel htmlFor="quantidade">Quantidade Nova:</FormLabel>
                <TextField
                  autoComplete="quantidade"
                  name="quantidade"
                type="number"
                  required
                  fullWidth
                  id="quantidade"
                  placeholder="XXXXXXXXXXXX"
                  value={formData.quantidade}
                  onChange={handleChange}
                />
              </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color={botao ? 'secondary' : 'primary'}
              onClick={handleSubmitFinal}

            >
              {botao ? 'Alterando...' : 'Alterar Quantidade'}
            </Button>



          </Card>
        


      </Box>

    </Card>


  )
};

export default AlterarLivro;