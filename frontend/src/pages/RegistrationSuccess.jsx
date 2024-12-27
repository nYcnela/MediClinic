import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CssBaseline, Typography } from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import NavBar from '../components/NavBar';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GradientContainer } from '../pages/sign-in/SignIn';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <GradientContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Rejestracja powiodła się!
          </Typography>
          <Typography variant="body1">
            Twoje konto zostało pomyślnie utworzone.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={() => navigate('/')}>
              Strona główna
            </Button>
            <Button variant="outlined" onClick={() => navigate('/login')}>
              Zaloguj się
            </Button>
          </Box>
        </Box>
      </GradientContainer>
    </AppTheme>
  );
}