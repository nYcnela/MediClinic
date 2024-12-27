import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Typography, Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';

const ConfirmationCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: '100%',
  margin: 'auto',
  padding: theme.spacing(3),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function AppointmentConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  const object = {
    doctor: 'dr nauk andrzej macierewicz',
    specialties: 'endokrynolog',
    data: '09.02.2032 17:32',
  };

  const pacjent = {
    id: '123456',
    name: 'Jan Kowalski',
    pesel: '03351232094',
  };

  const handleClick = () => {
    setConfirmed((prev) => !prev);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <ConfirmationCard>
          {!confirmed ? (
            <>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Potwierdzenie wizyty
                </Typography>
                <Typography variant="body1">Lekarz: {object.doctor}</Typography>
                <Typography variant="body1">Specjalizacja: {object.specialties}</Typography>
                <Typography variant="body1">Data: {object.data}</Typography>
                <Typography variant="body1">Pacjent: {pacjent.name}</Typography>
                <Typography variant="body1">PESEL: {pacjent.pesel}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleClick}>
                  Potwierdź wizytę
                </Button>
              </CardActions>
            </>
          ) : (
            <>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Wizyta została umówiona
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Wróć do strony głównej
                </Button>
              </CardActions>
            </>
          )}
        </ConfirmationCard>
      </Box>
    </AppTheme>
  );
}

export default AppointmentConfirmation;