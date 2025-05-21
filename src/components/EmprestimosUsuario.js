
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';



import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AppTheme from './mui/AppTheme';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';






import AppAppBarOut from "./mui/AppAppBarOut";
import AppAppBar from "./mui/AppAppBar";
import ListaLivros from "./ListaLivros";


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

const EmprestimosUsuario = (props) => {
  const navigate = useNavigate();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      emprestimos
      

      
    </AppTheme>
  )
};

export default EmprestimosUsuario;