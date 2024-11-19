import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'; // Importowanie MUI komponentów

function NavBar() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" component="div">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            MediClinic
          </Link>
        </Typography>

        {/* Linki nawigacyjne */}
        <Box>
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{ marginLeft: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            color="inherit"
            sx={{ marginLeft: 2 }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
