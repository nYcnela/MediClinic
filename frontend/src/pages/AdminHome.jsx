import React from "react";
import { Box, Button, CssBaseline, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import useAuth from "../hooks/useAuth";
import { GradientContainer } from "./sign-in/SignIn";
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    width: "75%"
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px"
  })
}));

function AdminHome() {
  const { auth } = useAuth();
  const name = auth?.name;
  const roles = auth?.roles;

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <AdminNavbar />
      <GradientContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          p: 2
        }}
      >
        <StyledBox>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Panel Admina
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Czego szukasz?
          </Typography>
          <List>
            <ListItem button component={Link} to="/add-doctor">
              <ListItemText primary="Dodawanie lekarza" />
            </ListItem>
            {/*
            
            <ListItem button component={Link} to="/">
              <ListItemText primary="Odwoływanie wizyty" />
            </ListItem>
            */}
            <ListItem button component={Link} to="/delete-users">
              <ListItemText primary="Usuwanie użytkowników" />
            </ListItem>
          </List>
        </StyledBox>
      </GradientContainer>
    </AppTheme>
  );
}

export default AdminHome;