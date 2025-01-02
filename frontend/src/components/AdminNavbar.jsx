import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import useAuth from '../hooks/useAuth';

function NavBar() {
  const { setAuth, logout, auth } = useAuth(); 
  const [anchorEl, setAnchorEl] = React.useState(null);

  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    
  }, [auth]);

  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/admin-home" style={{ textDecoration: 'none', color: 'inherit' }}>
            MediClinic
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {auth?.user ? (
            <Box>
              <Button component={Link} to="/add-doctor" color="inherit" sx={{ mx: 1 }}>
                Dodaj lekarza
              </Button>
              <Button component={Link} to="/delete-users" color="inherit" sx={{ mx: 1 }}>
                Wyjeb użytkownika
              </Button>
              <Button onClick={logout} color="inherit" sx={{ mx: 1 }}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <Button component={Link} to="/login" color="inherit" sx={{ mx: 1 }}>
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" sx={{ mx: 1 }}>
                Register
              </Button>
            </Box>
          )}
          <ColorModeSelect sx={{ ml: 2 }} />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {auth?.user ? (
              <Box>
                <MenuItem onClick={handleMenuClose} component={Link} to="/delete-users">
                  Wyjeb uzytkownika
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/add-doctor">
                  Dodaj lekarza
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
                  Logout
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                  Register
                </MenuItem>
              </Box>
            )}
          </Menu>
          <ColorModeSelect sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;