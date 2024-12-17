import React from "react";
import { Typography, Box, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';


import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[800],
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));
function PastAppointments() {
  const pastAppointments = [
    { id: 1, date: "2023-09-12", doctor: "Dr. Nowak", summary: "Kontrola zdrowia" },
    { id: 2, date: "2023-08-05", doctor: "Dr. Kowalska", summary: "Wizyta kontrolna" },
  ];

  return (
    <Card>
      <Typography variant="h5" component="h2">
        Odbyte wizyty
      </Typography>
      <List>
        {pastAppointments.map((appointment) => (
          <ListItem key={appointment.id}>
            {appointment.date} - {appointment.doctor} <br />
            Podsumowanie: {appointment.summary}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default PastAppointments;