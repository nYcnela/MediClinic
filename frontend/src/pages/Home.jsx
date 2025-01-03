import React from "react";
import { Typography, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import NavBar from "../components/NavBar";
import AppTheme from "../shared-theme/AppTheme.jsx";
import useAuth from "../hooks/useAuth";
import useUserData from "../hooks/useUserData";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GradientContainer } from "./sign-in/SignIn";
function Home(props) {
  const { auth } = useAuth();
  const { data } = useUserData();
  const name = data?.name;
  const destination = auth?.roles?.includes("user") ? "/profile" : "/doctor-profile";

  const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
      width: "450px",
    },
    ...theme.applyStyles("dark", {
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
  }));

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <NavBar />
      <GradientContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Card variant="outlined">
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Witaj w MediClinic{name && auth ? `, ${name}` : ""}!
          </Typography>
          <Typography variant="h5" component="h3" sx={{ mb: 4 }}>
            Czego szukasz?
          </Typography>
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ListItem sx={{ width: "100%" }}>
              <Button
                component={Link}
                to="/make-appointment"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Chcę umówić wizytę
              </Button>
            </ListItem>
            {auth?.roles  && (
                <ListItem sx={{ width: "100%" }}>
                  <Button
                    component={Link}
                    to={"/profile"}
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%" }}
                  >
                    Chcę zobaczyć swój profil
                  </Button>
                </ListItem>
                )}
                <ListItem sx={{ width: "100%" }}>
                  <Button
                    component={Link}
                    to="/doctor-profile"
                    variant="outlined"
                    color="primary"
                    sx={{ width: "100%" }}
                    disabled = {true}
                  >
                    Chcę zobaczyć profile lekarzy
                  </Button>
                </ListItem>
          </List>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default Home;
