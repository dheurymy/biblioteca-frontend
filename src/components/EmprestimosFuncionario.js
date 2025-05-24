
import React, { useEffect, useState } from 'react';


import CssBaseline from '@mui/material/CssBaseline';



import AppTheme from './mui/AppTheme';


import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CadastroEmprestimo from './CadastroEmprestimo';
import FinalizaEmprestimo from './FinalizaEmprestimo';
import EmprestimosPendentes from "./EmprestimosPendentes";


const EmprestimosFuncionario = (props) => {
    const [navegacao, setNavegacao] =  React.useState("");

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
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '100%' },
                        textAlign: { sm: 'center', md: 'center' },
                        gap: 2
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h4"
                        gutterBottom
                        sx={{ color: 'text.primary' }}
                    >
                        Empréstimos
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Veja abaixo o catálogo de itens em empréstimos.
                    </Typography>
                    
                </Box>
                <Box
                        sx={{
                            width: { sm: '100%', md: '100%' },
                           
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexDirection: {xs: 'column', sm: 'row'},
                            textAlign: { sm: 'center', md: 'center' },

                        }}
                    >
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => setNavegacao("cadastro")}
                        >
                            Cadastrar Empréstimo
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => setNavegacao("finaliza")}
                        >
                            Finalizar Empréstimo
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => setNavegacao("pendentes")}
                        >
                            Lista de Empréstimos
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: { sm: '100%', md: '100%' },
                           
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexDirection: {xs: 'column', sm: 'row'},
                            textAlign: { sm: 'center', md: 'center' },

                        }}
                    >
                        {navegacao === "cadastro" && <CadastroEmprestimo />}
                        {navegacao === "finaliza" && <FinalizaEmprestimo />}
                        {navegacao === "pendentes" && <EmprestimosPendentes />}

                    </Box>




            </Container>




        </AppTheme>
    )

};


export default EmprestimosFuncionario;