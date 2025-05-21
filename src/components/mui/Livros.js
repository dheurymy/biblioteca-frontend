
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











export default function Testimonials() {



  const [livros, setLivros] = useState([]);
  const [sortOrder, setSortOrder] = useState('AZ');
  const [pesquisa, setPesquisa] = useState('');
  const [filtroAutor, setFiltroAutor] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');

  const [texto, setTexto] = useState(true);



  useEffect(() => {
    const pegarLivros = async () => {
      try {
        const response = await fetch('https://biblioteca-backend-kappa.vercel.app/livros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setTexto(false);
          console.log(data);
          setLivros(data.livros);
        } else {
          console.error(data.message);
          setTexto(true);
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    pegarLivros();
  }, []);


  const autores = [...new Set(livros.map(livro => livro.autor))].sort();
  console.log(autores);


  const generos = [...new Set(livros.map(livro => livro.genero))].sort();
  console.log(generos);

  

  const livrosFiltrados = livros.filter(livro => {
    const filtradosAutor = filtroAutor ? livro.autor === filtroAutor : true;
    const filtradosGenero = filtroGenero ? livro.genero === filtroGenero : true;


    return filtradosAutor && filtradosGenero;
  }).filter(livro => livro.titulo.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const livrosOrdenados = livrosFiltrados.sort((a, b) => {
    if (sortOrder === 'AZ') {
      return a.titulo.localeCompare(b.titulo);
    } else {
      return b.titulo.localeCompare(a.titulo);
    }
  });



return (
     
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
          Acervo de Livros
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Veja abaixo os livros disponíveis no nosso acervo.
        </Typography>
      </Box>
      <Box sx={{
        width: { sm: '100%', md: '100%' },
        textAlign: { sm: 'center', md: 'center' },
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        gap: 2
      }}>
        <FormControl sx={{
          flex: 1
        }} >
          <FormLabel htmlFor="ordem">Ordenação:</FormLabel>
          <TextField
            required
            fullWidth
            name="ordem"
            id="ordem"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="" disabled>
              Selecione a ordem
            </option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </TextField>
        </FormControl>
        <FormControl sx={{
          flex: 1
        }} >
          <FormLabel htmlFor="autor">Autor:</FormLabel>
          <TextField
            required
            fullWidth
            name="autor"
            id="autor"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={filtroAutor}
            onChange={(e) => setFiltroAutor(e.target.value)}
          >
            <option value="" >
              Selecione o autor
            </option>
            {autores.map((autor) => (
              <option key={autor} value={autor}>
                {autor}
              </option>
            ))}
          </TextField>
        </FormControl>

        <FormControl sx={{
          flex: 1
        }}>
          <FormLabel htmlFor="genero">Gênero:</FormLabel>
          <TextField
            required
            fullWidth
            name="genero"
            id="genero"
            select
            SelectProps={{ native: true }}
            variant="outlined"
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
          >
            <option value="" >
              Selecione o genero
            </option>
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </TextField>
        </FormControl>

        <FormControl sx={{
          flex: 1
        }}>
          <FormLabel htmlFor="pesquisa">Livro:</FormLabel>
          <TextField
            autoComplete="pesquisa"
            name="pesquisa"
            required
            fullWidth
            id="pesquisa"
            placeholder="Percy Jackson"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}


          />
        </FormControl>
        

      </Box>
     
      <Grid container spacing={2}>
        {livrosOrdenados.length === 0 && texto == false && (
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Infelizmente, não temos esse.
          </Typography>
        )}
        {texto ? "Buscando livros..." : "" }

        {livrosOrdenados.map((livro, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex', minWidth: '300px' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1, 
                borderColor: (livro.quantidade > 1 ? 'Highlight' : 'GrayText')
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  Autoria: {livro.autor} &nbsp;&nbsp;&nbsp;&nbsp; Ano: {livro.anoPublicacao}<br></br>
                  Gênero: {livro.genero} &nbsp;&nbsp;&nbsp;&nbsp; Editora: {livro.editora} <br></br>
                  ISBN: {livro.isbn}       <br></br>            
                  Localização: {livro.localizacao}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader

                  title={livro.titulo}

                  subheader={livro.quantidade > 1 ? 'Status: Disponível' : 'Status: Somente Consulta'}

                />

              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    )

    
  
}
