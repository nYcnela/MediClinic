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
function UpcomingAppointmentsList() {
  const appointments = [
    { id: 1, date: "2024-10-12", time: "17.00", subject: "Dr. Nowak" },
    { id: 2, date: "2024-11-05", time: "17.00", subject: "Dr. Kowalska" },
  ];

  return (
    <Card>
      <Typography variant="h5" component="h2">
        Nadchodzące wizyty
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}>
            {appointment.date}, {appointment.time} - {appointment.subject}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default UpcomingAppointmentsList;