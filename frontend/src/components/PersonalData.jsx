import React from "react";
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useUserData from "../hooks/useUserData";

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

function PersonalData({ onEdit }) {
  const { data } = useUserData();

  return (
    <Card>
      <Typography variant="h5" component="h2">
        Dane osobowe
      </Typography>
      <Typography variant="body1">
        Imię i nazwisko: {data.name + " " + data.surname}
      </Typography>
      <Typography variant="body1">
        Data urodzenia: {data.birthDay}
      </Typography>
      <Typography variant="body1">
        E-mail: {data.email}
      </Typography>
    </Card>
  );
}

export default PersonalData;