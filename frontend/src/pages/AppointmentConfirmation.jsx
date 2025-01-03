import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardActions, Typography, Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import useUserData from '../hooks/useUserData';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
  const [confirmed, setConfirmed] = useState(false);
  const { data, setData } = useUserData();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const object = {
    doctor: data.appointment_title,
    specialties: data.appointment_specialties,
    data: data.appointment_date,
    id: data.appointment_id
  };
  const CREATE_APPOINTMENT_ENDPOINT = "/appointment/create";

  const pacjent = {
    id: auth.id,
    name: data.name + ' ' + data.surname,
  };

  const handleClick = async () => {
    try { 
          const response = await axiosPrivate.post(CREATE_APPOINTMENT_ENDPOINT, {
            doctorId:object.id,
            userId:pacjent.id,
            appointmentTime: object.data
          });
          if(response.status === 201){
            navigate("/registration-success");
          }
      } catch (error) {
          console.log(error.message);
      }

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