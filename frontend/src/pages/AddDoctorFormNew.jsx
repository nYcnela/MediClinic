import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import InputLabel from '@mui/material/InputLabel';
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import { SitemarkIcon } from "../pages/sign-in/CustomIcons";
import { weekDays } from "../assets/strings";
import {
  validateName,
  validatePesel,
  validatePwz,
  validatePhoneNumber,
  validateEmail,
} from "../functions/validations";
import NavBar from "../components/NavBar";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

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

const AddDoctorContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  padding: theme.spacing(2),
  position: "relative",
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
    backgroundSize: "cover",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

function AddDoctorForm(props) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameStatus, setNameStatus] = useState(false);

  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [surnameStatus, setSurnameStatus] = useState(false);

  const [pesel, setPesel] = useState("");
  const [peselError, setPeselError] = useState("");
  const [peselStatus, setPeselStatus] = useState(false);

  const [pwz, setPwz] = useState("");
  const [pwzError, setPwzError] = useState("");
  const [pwzStatus, setPwzStatus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailStatus, setEmailStatus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [phoneNumberStatus, setPhoneNumberStatus] = useState(false);

  const [degree, setDegree] = useState("");
  const [degreeError, setDegreeError] = useState("");
  const [degreeStatus, setDegreeStatus] = useState(false);

  const [specialization, setSpecialization] = useState([]);
  const [specializationError, setSpecializationError] = useState("");
  const [specializationStatus, setSpecializationStatus] = useState(false);

  const [workDays, setWorkDays] = useState([]);
  const [workDaysError, setWorkDaysError] = useState("");
  const [workDaysStatus, setWorkDaysStatus] = useState(false);

  const [workHours, setWorkHours] = useState({
    monday: { start: "", end: "" },
    tuesday: { start: "", end: "" },
    wednesday: { start: "", end: "" },
    thursday: { start: "", end: "" },
    friday: { start: "", end: "" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  });

  const [workHoursStatus, setWorkHoursStatus] = useState(false);

  const validateInputs = () => {
    validateName(name, setNameError, setNameStatus);
    validateName(surname, setSurnameError, setSurnameStatus);
    validatePesel(pesel, setPeselError, setPeselStatus);
    validatePwz(pwz, setPwzError, setPwzStatus);
    validateEmail(email, setEmailError, setEmailStatus);
    validatePhoneNumber(phoneNumber, setPhoneNumberError, setPhoneNumberStatus);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateInputs();
    if (
      !(
        nameStatus &&
        surnameStatus &&
        peselStatus &&
        pwzStatus &&
        emailStatus &&
        phoneNumberStatus
      )
    ) {
      console.log("Panowie coś jest nie tak");
      return;
    }
    // Add your submit logic here
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <NavBar />
      <AddDoctorContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Dodaj lekarza
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
                onBlur={() => validateName(name, setNameError, setNameStatus)}
                error={!nameStatus}
                helperText={nameError}
                color={nameStatus ? "primary" : "error"}
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
                  validateName(surname, setSurnameError, setSurnameStatus)
                }
                error={!surnameStatus}
                helperText={surnameError}
                color={surnameStatus ? "primary" : "error"}
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
                  validatePesel(pesel, setPeselError, setPeselStatus)
                }
                error={!peselStatus}
                helperText={peselError}
                color={peselStatus ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pwz">Numer PWZ</FormLabel>
              <TextField
                required
                fullWidth
                id="pwz"
                name="pwz"
                autoComplete="pwz"
                placeholder="XXXXXXXX"
                value={pwz}
                onChange={(e) => setPwz(e.target.value)}
                onBlur={() => validatePwz(pwz, setPwzError, setPwzStatus)}
                error={!pwzStatus}
                helperText={pwzError}
                color={pwzStatus ? "primary" : "error"}
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
                  validateEmail(email, setEmailError, setEmailStatus)
                }
                autoComplete="email"
                error={!emailStatus}
                helperText={emailError}
                color={emailStatus ? "primary" : "error"}
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
                    setPhoneNumberError,
                    setPhoneNumberStatus
                  )
                }
                autoComplete="phoneNumber"
                error={!phoneNumberStatus}
                helperText={phoneNumberError}
                color={phoneNumberStatus ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="degree">Stopień naukowy</FormLabel>
              <TextField
                required
                fullWidth
                id="degree"
                name="degree"
                autoComplete="degree"
                placeholder="dr. n. med."
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                onBlur={() =>
                  validateName(degree, setDegreeError, setDegreeStatus)
                }
                error={!degreeStatus}
                helperText={degreeError}
                color={degreeStatus ? "primary" : "error"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="specialization">Specjalizacja</FormLabel>
              <TextField
                required
                fullWidth
                id="specialization"
                name="specialization"
                autoComplete="specialization"
                placeholder="Ortopedia"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                onBlur={() =>
                  validateName(
                    specialization,
                    setSpecializationError,
                    setSpecializationStatus
                  )
                }
                error={!specializationStatus}
                helperText={specializationError}
                color={specializationStatus ? "primary" : "error"}
              />
            </FormControl>
            <InputLabel id="workDaysLabel">Dni pracy:</InputLabel>
            <Select
              labelId="workDaysLabel"
              id="workDays"
              value={workDays}
              label="Dni pracy"
              multiple
              onChange={(e) => {
                const arr = [];
                e.target.value.forEach((element) => arr.push(element));
                setWorkDays(arr);
              }}
            >
              {weekDays.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.label}
                </MenuItem>
              ))}
            </Select>
            <Button type="submit" fullWidth variant="contained">
              Dodaj lekarza
            </Button>
          </Box>
        </Card>
      </AddDoctorContainer>
    </AppTheme>
  );
}

export default AddDoctorForm;
