import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import biblioteca1 from '../../assets/images/biblioteca1.jpg';




export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '100%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Biblioteca&nbsp;de&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              Ohara
            </Typography>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography
              sx={{
                textAlign: 'justify',
                color: 'text.secondary',
                width: { sm: '100%', md: '60%' },
              }}
            >
              Na vastidão do mundo, onde histórias moldam destinos e o conhecimento é a chave para o futuro, a Biblioteca Pública da Universidade de Ohara, mais conhecida como <strong>Biblioteca de Ohara</strong>, se ergue como um bastião para aqueles que buscam sabedoria. Aqui, cada livro é um mapa, cada manuscrito é um tesouro, e cada visitante é um explorador pronto para desbravar o conhecimento. Nossa missão é manter viva a curiosidade e proporcionar um ambiente onde a aprendizagem se transforma em uma verdadeira aventura. <br></br>
              <ul>
                <li><strong>Acervo Gigantesco</strong> – Dos clássicos da literatura mundial aos registros históricos mais profundos.</li>
                <li><strong>Espaço para Pesquisas</strong> – Encontre respostas e expanda seus horizontes.</li>
                <li><strong>Comunidade de Pensadores</strong> – Participe de debates, palestras e eventos sobre ciência, história e filosofia.</li>
              </ul>
              Seja você um estudioso, um viajante do conhecimento ou um aventureiro buscando as verdades do mundo, a Biblioteca de Ohara é o seu porto seguro. Venha e embarque nesta jornada!  <br></br>
            
            </Typography>
            <img
              src={biblioteca1}
              alt="Logo da Biblioteca de Ohara"
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
                
              }}></img>
          </Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' } }}
          >
             
            
          </Stack>
         
          
        </Stack>

      </Container>
    </Box>
  );
}
