import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Button,
  CssBaseline,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import NavBar from '../components/NavBar';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GradientContainer } from './sign-in/SignIn';
import useUserData from '../hooks/useUserData';

const ConfirmationCard = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '75%'
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
  })
}));

export default function DoctorCreated() {
  const navigate = useNavigate();
  const { data } = useUserData();
  const temporaryPassword = data?.temporaryPassword;

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <GradientContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          minWidth: '100%',
          p: 2
        }}
      >
        <ConfirmationCard variant="outlined">
          <CardContent sx={{ width: '100%' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Konto lekarza zostało utworzone
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Hasło dostępu do jego konta to: {temporaryPassword}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => navigate('/admin-home')}
              variant="contained"
              color="primary"
            >
              Przejdź do strony głównej
            </Button>
          </CardActions>
        </ConfirmationCard>
      </GradientContainer>
    </AppTheme>
  );
}