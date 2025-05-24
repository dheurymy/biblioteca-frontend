
import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import Typography from '@mui/material/Typography';

import { Link, useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBarOut({ handleNavChange }) {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const [navUsu, setNavUsu] = useState("");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const endereco = JSON.parse(localStorage.getItem("endereco"));
  const funcionario = JSON.parse(localStorage.getItem("funcionario"));



  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('funcionario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('endereco');

    navigate('/');
  };


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0 }}>

            <Typography
              variant="h1"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                fontSize: { xs: 'clamp(0.7rem, 3vw, 1rem)', sm: 'clamp(1rem, 3vw, 1.5rem)' },

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


            {usuario ?
              <Box sx={{ display: { xs: 'none', md: 'flex', gap: 3 } }}>

                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("acervo")}>
                  Acervo
                </Button>
                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("emprestimos")}>
                  Empréstimos
                </Button>
                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("dados")}>
                  Meus Dados
                </Button>
                <Button variant="text" color="info" size="small" onClick={logout}>
                  Sair
                </Button>
                <ColorModeIconDropdown />

              </Box>
              : null}

            {funcionario ?
              <Box sx={{ display: { xs: 'none', md: 'flex', gap: 3 } }}>

                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("acervo")}>
                  Acervo
                </Button>
                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("emprestimos")}>
                  Empréstimos
                </Button>
                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("livros")}>
                  Livros
                </Button>
                <Button variant="text" color="info" size="small" onClick={() => handleNavChange("dados")}>
                  Meus Dados
                </Button>
                <Button variant="text" color="info" size="small" onClick={logout}>
                  Sair
                </Button>
                <ColorModeIconDropdown />

              </Box>
              : null}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>


                {usuario ? (
                  <>
                    <MenuItem onClick={() => handleNavChange("acervo")}>Acervo</MenuItem>
                    <MenuItem onClick={() => handleNavChange("emprestimos")}>Empréstimos</MenuItem>
                    <MenuItem onClick={() => handleNavChange("dados")}>Meus Dados</MenuItem>
                    <MenuItem onClick={logout}>Sair</MenuItem>
                  </>
                ) : null}

                {funcionario ? (
                  <>
                    <MenuItem onClick={() => handleNavChange("acervo")}>Acervo</MenuItem>
                    <MenuItem onClick={() => handleNavChange("emprestimos")}>Empréstimos</MenuItem>
                    <MenuItem onClick={() => handleNavChange("livros")}>Livros</MenuItem>
                    <MenuItem onClick={() => handleNavChange("dados")}>Meus Dados</MenuItem>
                    <MenuItem onClick={logout}>Sair</MenuItem>
                  </>
                ) : null}


              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
