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
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            MediClinic
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {auth?.user ? (
            <>
              <Button component={Link} to="/profile" color="inherit" sx={{ mx: 1 }}>
                Profile
              </Button>
              <Button onClick={logout} color="inherit" sx={{ mx: 1 }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" sx={{ mx: 1 }}>
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit" sx={{ mx: 1 }}>
                Register
              </Button>
            </>
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
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
          <ColorModeSelect sx={{ ml: 2 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;