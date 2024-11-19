import React from 'react';
import { Box, Typography, Button, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useUserData from '../hooks/useUserData';
import AppTheme from '../shared-theme/AppTheme'; // Importowanie AppTheme
import CssBaseline from '@mui/material/CssBaseline';

function Home() {
  const { data } = useUserData();
  const name = data?.name;

  return (
    <AppTheme>
        <CssBaseline enableColorScheme />
      {/* Nawigacja */}
      <NavBar />
      <Box sx={{ p: 4, textAlign: 'center' }}>
        {/* Powitanie użytkownika */}
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Witaj w MediClinic{name ? `, ${name}` : ''}!
        </Typography>
        <Typography variant="h5" component="h3" sx={{ mb: 4 }}>
          Czego szukasz?
        </Typography>

        {/* Lista opcji */}
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <ListItem>
            <Button
              component={Link}
              to="/make-appointment"
              variant="contained"
              color="primary"
              sx={{ width: '200px' }}
            >
              Chcę umówić wizytę
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              color="primary"
              sx={{ width: '200px' }}
            >
              Chcę zobaczyć swój profil
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/team"
              variant="outlined"
              color="primary"
              sx={{ width: '200px' }}
            >
              Chcę poznać zespół MediClinic
            </Button>
          </ListItem>
        </List>
      </Box>
    </AppTheme>
  );
}

export default Home;
