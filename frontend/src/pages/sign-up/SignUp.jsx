import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme.jsx";
import { SitemarkIcon } from "./CustomIcons";
import { sendRegistrationData } from "../../functions/requests";
import { useNavigate } from "react-router-dom";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import {
  validateName,
  validatePassword,
  validateEmail,
  validatePesel,
  validatePhoneNumber,
} from "../../functions/validations";
import NavBar from "../../components/NavBar";
import axios from "../../axios/axios.js";

const REGISTER_URL = "/auth/register";

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative", // Dodajemy pozycjonowanie względne
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", // Upewniamy się, że gradient wypełnia cały kontener
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();
    
  const [email, setEmail] = React.useState("");
  const [emailOk, setEmailOk] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordOk, setPasswordOk] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const [name, setName] = React.useState("");
  const [nameOk, setNameOk] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [surname, setSurname] = React.useState("");
  const [surnameOk, setSurnameOk] = React.useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = React.useState("");

  const [pesel, setPesel] = React.useState("");
  const [peselOk, setPeselOk] = React.useState(false);
  const [peselErrorMessage, setPeselErrorMessage] = React.useState("");

  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberOk, setPhoneNumberOk] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    React.useState("");

  const validateInputs = () => {
    validatePhoneNumber(
      phoneNumber,
      setPhoneNumberErrorMessage,
      setPhoneNumberOk,
      setPhoneNumber
    );
    validateEmail(email, setEmailErrorMessage, setEmailOk);
    validatePassword(password, setPasswordErrorMessage, setPasswordOk);
    validatePesel(pesel, setPeselErrorMessage, setPeselOk);
    validateName(name, setNameErrorMessage, setNameOk);
    validateName(surname, setSurnameErrorMessage, setSurnameOk);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateInputs();
    if (
      !(
        emailOk &&
        passwordOk &&
        nameOk &&
        surnameOk &&
        peselOk &&
        phoneNumberOk
      )
    ) {
      console.log("Wystąpił błąd podczas rejestracji");
      return;
    }

    try { 
      const response = await axios.post(REGISTER_URL, {
        name,
        surname,
        pesel,
        email,
        phoneNumber,
        password
      });
      if(response.status === 201){
        navigate("/registration-success");
      }
  } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <NavBar></NavBar>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Rejestracja
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Imię</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() =>
                  validateName(name, setNameErrorMessage, setNameOk)
                }
                error={!nameOk}
                helperText={nameErrorMessage}
                color={nameOk ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="surname">Nazwisko</FormLabel>
              <TextField
                autoComplete="surname"
                name="surname"
                required
                fullWidth
                id="surname"
                placeholder="Kowalski"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                onBlur={() =>
                  validateName(surname, setSurnameErrorMessage, setSurnameOk)
                }
                error={!surnameOk}
                helperText={surnameErrorMessage}
                color={surnameOk ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pesel">Pesel</FormLabel>
              <TextField
                required
                fullWidth
                id="pesel"
                name="pesel"
                autoComplete="pesel"
                placeholder="XXXXXXXXXXX"
                value={pesel}
                onChange={(e) => setPesel(e.target.value)}
                onBlur={() =>
                  validatePesel(pesel, setPeselErrorMessage, setPeselOk)
                }
                error={!peselOk}
                helperText={peselErrorMessage}
                color={peselOk ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Adres email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="twoj@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() =>
                  validateEmail(email, setEmailErrorMessage, setEmailOk)
                }
                autoComplete="email"
                error={!emailOk}
                helperText={emailErrorMessage}
                color={emailOk ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phoneNumber">Numer telefonu</FormLabel>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                placeholder="XXX-XXX-XXX"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() =>
                  validatePhoneNumber(
                    phoneNumber,
                    setPhoneNumberErrorMessage,
                    setPhoneNumberOk,
                    setPhoneNumber
                  )
                }
                autoComplete="phoneNumber"
                error={!phoneNumberOk}
                helperText={phoneNumberErrorMessage}
                color={phoneNumberOk ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Hasło</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() =>
                  validatePassword(
                    password,
                    setPasswordErrorMessage,
                    setPasswordOk
                  )
                }
                error={!passwordOk}
                helperText={passwordErrorMessage}
                color={passwordOk ? "primary" : "error"}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Zarejestruj się
            </Button>

          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
