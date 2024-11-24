import React from 'react';
import { Box, Typography, Button, List, ListItem, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import NavBar from '../components/NavBar';
import AppTheme from '../shared-theme/AppTheme';
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';

function Home(props) {
  const { auth } = useAuth();
  const { data } = useUserData();
  const name = data?.name;

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <Card variant="outlined" sx={{ padding: 4, maxWidth: 600, width: '100%', textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            Witaj w MediClinic{name&&auth ? `, ${name}` : ''}!
          </Typography>
          <Typography variant="h5" component="h3" sx={{ mb: 4 }}>
            Czego szukasz?
          </Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <ListItem sx={{ width: '100%' }}>
              <Button
                component={Link}
                to="/make-appointment"
                variant="contained"
                color="primary"
                sx={{ width: '100%' }}
              >
                Chcę umówić wizytę
              </Button>
            </ListItem>
            {auth ? (
              <>
                <ListItem sx={{ width: '100%' }}>
                  <Button
                    component={Link}
                    to="/profile"
                    variant="outlined"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    Chcę zobaczyć swój profil
                  </Button>
                </ListItem>
                <ListItem sx={{ width: '100%' }}>
                  <Button
                    component={Link}
                    to="/doctor-profile"
                    variant="outlined"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    Chcę zobaczyć profil lekarza
                  </Button>
                </ListItem>
                <ListItem sx={{ width: '100%' }}>
                  <Button
                    component={Link}
                    to="/team"
                    variant="outlined"
                    color="primary"
                    sx={{ width: '100%' }}
                  >
                    Chcę poznać zespół MediClinic
                  </Button>
                </ListItem>
              </>
            ) : (
              <ListItem sx={{ width: '100%' }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  sx={{ width: '100%' }}
                >
                  Zaloguj się, aby uzyskać dostęp do pełnej funkcjonalności
                </Button>
              </ListItem>
            )}
          </List>
        </Card>
      </Box>
    </AppTheme>
  );
}

export default Home;