import React, { useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


import AppTheme from './mui/AppTheme';



import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';










const DadosUsuario = (props) => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const endereco = JSON.parse(localStorage.getItem("endereco"));

  const [botao, setBotao] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

  const [formData, setFormData] = useState({
    nome: usuario.nome,
    cpf: usuario.cpf,
    email: usuario.email,

    telefone: usuario.telefone,
    senha: "",
    tipoUsuario: usuario.tipoUsuario


  });

  const [endData, setEndData] = useState({
    usuarioId: usuario._id,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    complemento: endereco.complemento,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado,
    cep: endereco.cep
  });

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

  const formatarCEP = (value) => {
    value = value.replace(/\D/g, "").slice(0, 8);
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
    } else if (name === "cep") {
      formattedValue = formatarCEP(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
    setEndData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBotao(true);
    console.log(usuario._id);
    console.log(formData);

    const { nome, email, cpf, telefone, senha, tipoUsuario } = formData;

    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/usuarios/${usuario._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, cpf, telefone, senha, tipoUsuario }),
      });

      // Tenta converter a resposta para JSON, mas captura erros caso falhe
      let data;

      data = await response.json();


      if (response.ok) {
        alert("Dados do usuário atualizado com sucesso!");
        setBotao(false);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
      } else {
        alert(data.mensagem || data.message || "Erro ao atualizar usuário.");
        setBotao(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar usuário. Tente novamente mais tarde.");
    }

  };

  const handleSubmitEndereco = async (event) => {
    event.preventDefault();
    setBotao(true);

    const { logradouro, numero, complemento, bairro, cidade, estado, cep } = formData;

    try {
      const response = await fetch(`https://biblioteca-backend-kappa.vercel.app/enderecos/${usuario._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logradouro, numero, complemento, bairro, cidade, estado, cep }),
      });

      
      let data;

      data = await response.json();


      if (response.ok) {
        alert("Dados do endereço atualizados com sucesso!");
        setBotao(false);
        localStorage.setItem('endereco', JSON.stringify(data.endereco));
      } else {
        alert(data.mensagem || data.message || "Erro ao atualizar endereço.");
        setBotao(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar endereço. Tente novamente mais tarde.");
    }

  };

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
          marginTop: { xs: 15, sm: 10 }
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Dados de Usuário
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Olá, {usuario.nome}! Veja abaixo, e corrija quando precisar, os seus dados de usuário.
          </Typography>
        </Box>

        <Box
          sx={{
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'left', md: 'center' },
            display: toggle ? 'none' : 'flex',
            flexDirection: { xs: "column", md: "row" },
            gap: 2
          }}
        >
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexGrow: 1,
              borderColor: 'Highlight'
            }}
          >
            <CardHeader
              title={"Dados Gerais:"}


            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Nome: {usuario.nome} <br></br>
                CPF: {usuario.cpf} <br></br>
                E-mail: {usuario.email} <br></br>
                Telefone: {usuario.telefone} <br></br>
                Tipo de Usuário: {usuario.tipoUsuario}

              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setToggle(true)}
                color='warning'

              >
                Alterar Dados
              </Button>




            </CardContent>

          </Card>

          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexGrow: 1,
              borderColor: 'Highlight'
            }}
          >
            <CardHeader
              title={"Endereço:"}


            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Logradouro: {endereco.logradouro} <br></br>
                Número: {endereco.numero} <br></br>
                Complemento: {endereco.complemento} <br></br>
                Bairro: {endereco.bairro} <br></br>
                Cidade: {endereco.cidade} <br></br>
                Bairro: {endereco.estado} <br></br>
                CEP: {endereco.cep}

              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setToggle(true)}
                color='warning'

              >
                Alterar Endereço
              </Button>



            </CardContent>

          </Card>

        </Box>





        <Card variant="outlined" sx={{ display: toggle ? 'flex' : 'none', flexDirection: { xs: "column", md: "row" } }}>
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
                onChange={handleChange}
                fullWidth
                id="nome"
                placeholder="Shikamaru Nara"
                value={formData.nome}
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
              />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: "column", md: 'row' } }}>
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
              <FormLabel htmlFor="senha">Senha (obrigatório):</FormLabel>
              <TextField
                fullWidth
                required
                name="senha"
                placeholder="••••••"
                type="password"
                id="senha"
                value={formData.senha}
                autoComplete="new-senha"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              color={botao ? 'secondary' : 'primary'}
            >
              {botao ? 'Alterando...' : 'Alterar Dados'}
            </Button>

          </Box>

          <Box
            component="form"
            onSubmit={handleSubmitEndereco}
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
                value={endData.logradouro}
                onChange={handleChange}


              />
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="numero">Número:</FormLabel>
                <TextField

                  fullWidth
                  id="numero"
                  placeholder="24"
                  name="numero"
                  autoComplete="numero"
                  variant="outlined"
                  value={endData.numero}
                  onChange={handleChange}


                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="bairro">Bairro:</FormLabel>
                <TextField

                  fullWidth
                  id="bairro"
                  placeholder="Distrito Leste"
                  name="bairro"
                  autoComplete="bairro"

                  variant="outlined"
                  value={endData.bairro}
                  onChange={handleChange}


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
                  value={endData.complemento}
                  onChange={handleChange}


                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cidade">Cidade:</FormLabel>
                <TextField
                  autoComplete="cidade"
                  name="cidade"

                  fullWidth
                  id="cidade"
                  placeholder="Vila Oculta da Folha"
                  value={endData.cidade}
                  onChange={handleChange}



                />
              </FormControl>






            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="cep">CEP:</FormLabel>
                <TextField

                  fullWidth
                  id="cep"
                  placeholder="XXXXX-XXX"
                  name="cep"
                  autoComplete="cep"
                  variant="outlined"
                  value={endData.cep}
                  onChange={handleChange}

                />
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="estado">Estado:</FormLabel>
                <TextField

                  fullWidth
                  name="estado"
                  id="estado"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  value={endData.estado}
                  onChange={handleChange}


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
              onClick={handleSubmitEndereco}
              color={botao ? 'secondary' : 'primary'}
            >
              {botao ? 'Alterando...' : 'Alterar Endereço'}
            </Button>


            <Button
              fullWidth
              variant="contained"
              onClick={() => setToggle(false)}
              color='warning'

            >
              Cancelar
            </Button>


          </Box>


        </Card>




      </Container>



    </AppTheme>
  )
};

export default DadosUsuario;