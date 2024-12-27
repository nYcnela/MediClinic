import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AppointmentCard({ title, specialties, data, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const wizytaId = id; 
    navigate(`/confirm-appointment/${wizytaId}`);
  };

  return (
    <Card
      sx={(theme) => ({
        width: '100%',
        margin: '1% 0',
        padding: '1%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[2],
        transition: 'background-color 0.3s, color 0.3s'
      })}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {specialties}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data wizyty: {data}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          })}
        >
          Wybierz wizytę
        </Button>
      </CardActions>
    </Card>
  );
}

export default AppointmentCard;