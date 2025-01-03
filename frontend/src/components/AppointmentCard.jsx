import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';
import { format, set } from 'date-fns';
import parseISO from 'date-fns/parseISO';
function AppointmentCard({ title, id, specialties, date }) {
  const navigate = useNavigate();
  const {data, setData} = useUserData();
  const handleClick = () => {
    navigate(`/confirm-appointment`);
    setAppointmentData();
  };

  
  const setAppointmentData = () => {
    const dateObject = parseISO(date)
    setData((prev) => ({
      ...prev,
        appointment_id: id,
        appointment_date: format(dateObject, 'yyyy-MM-dd HH:mm:ss'),
        appointment_title: title,
        appointment_specialties: specialties,
    })
    )
  }

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
          Data wizyty: {date}
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