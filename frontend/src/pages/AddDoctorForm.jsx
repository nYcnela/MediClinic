import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
  MenuItem,
  Select,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import NavBar from '../components/NavBar';
import useRefreshToken from '../hooks/useRefreshToken';
import { GradientContainer } from './sign-in/SignIn';
import { weekDays } from '../assets/strings';

import {
  validateName,
  validatePwz,
  validatePassword,
  validateEmail,
  validatePesel,
  validatePhoneNumber,
} from '../functions/validations';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const Card = styled(MuiCard)(({ theme }) => ({
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
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function AddDoctorForm() {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState('');
  const [nameOk, setNameOk] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [surname, setSurname] = useState('');
  const [surnameOk, setSurnameOk] = useState(false);
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberOk, setPhoneNumberOk] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailOk, setEmailOk] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [pesel, setPesel] = useState('');
  const [peselOk, setPeselOk] = useState(false);
  const [peselErrorMessage, setPeselErrorMessage] = useState('');

  const [pwz, setPwz] = useState('');
  const [pwzOk, setPwzOk] = useState(false);
  const [pwzErrorMessage, setPwzErrorMessage] = useState('');

  const [degree, setDegree] = useState('');
  const [degreeOk, setDegreeOk] = useState(false);
  const [degreeErrorMessage, setDegreeErrorMessage] = useState('');

  const [specialization, setSpecialization] = useState([]);
  const [specializationOk, setSpecializationOk] = useState(false);
  const [specializationErrorMessage, setSpecializationErrorMessage] = useState('');

  const [workDays, setWorkDays] = useState([]);
  const [workDaysOk, setWorkDaysOk] = useState(false);
  const [workDaysErrorMessage, setWorkDaysErrorMessage] = useState('');

  const [workHours, setWorkHours] = useState({
    monday: { start: '', end: '' },
    tuesday: { start: '', end: '' },
    wednesday: { start: '', end: '' },
    thursday: { start: '', end: '' },
    friday: { start: '', end: '' },
    saturday: { start: '', end: '' },
    sunday: { start: '', end: '' },
  });


  const [doctorSpecializations, setDoctorSpecializations] = useState([]);
  const [doctorDegrees, setDoctorDegrees] = useState([]);
  
  const ADD_DOCTOR_URL = '/doctor/add'

  
  const fetchDoctorDegrees = async () => {
    try {
      const response = await axiosPrivate.get('/doctor/degree');
      const data = response.data.degrees.map((degree) => ({ value: degree.id, label: degree.label }));
      setDoctorDegrees(data);
      console.log(data);
    } catch (error) {
      console.error('Błąd:', error);
    }
  };
  useEffect(() => {
    const fetchDoctorSpecializations = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctor/specializations');
        if (!response.ok) {
          throw new Error('Błąd sieci');
        }
        const data = await response.json();
        setDoctorSpecializations(data.specializations);
        console.log(data.specializations);
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    

    
    

    fetchDoctorSpecializations();
    fetchDoctorDegrees();
  }, []); 
  const availableTimes = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45',
    '20:00',
  ];
  const [workHoursErrors, setWorkHoursErrors] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  // useEffect, który zeruje godziny dla dni niewybranych w workDays,
  // ale NIE usuwa całkowicie klucza z obiektu workHours.
  const XD = useRefreshToken();
  useEffect(() => {
    setWorkHours((prev) => {
      const updatedWorkHours = { ...prev };

      // Sprawdzamy każdy dzień (klucz) w updatedWorkHours:
      for (const dayKey in updatedWorkHours) {
        // Jeśli ten dzień NIE jest w workDays, resetujemy jego godziny do pustych
        if (!workDays.includes(dayKey)) {
          updatedWorkHours[dayKey] = { start: '', end: '' };
        }
      }
      return updatedWorkHours;
    });
  }, [workDays]);

  const handleWorkHoursChange = (day, timeType, value) => {
    setWorkHours((prev) => {
      const updated = {
        ...prev,
        [day]: {
          ...prev[day],
          [timeType]: value,
        },
      };

      // Walidacja: jeśli end < start, ustawiamy błąd
      const startTime = updated[day].start;
      const endTime = updated[day].end;

      setWorkHoursErrors((prevErrors) => ({
        ...prevErrors,
        [day]: endTime && startTime && endTime < startTime,
      }));

      return updated;
    });
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const specs = specialization.map(spec => ({"value": spec}));
    const wdays = workDays.map(day => ({"value": day}));
    if(!nameOk || !surnameOk || !phoneNumberOk || !emailOk || !peselOk || !pwzOk || !degreeOk || !specializationOk || !workDaysOk) {
        console.log("Błąd walidacji");
        return;
    }

    console.log("name", name);
    console.log("surname", surname);
    console.log("phoneNumber", phoneNumber);
    console.log("email", email);
    console.log("pesel", pesel);
    console.log("pwz", pwz);
    console.log("degree", degree);
    console.log("specialization", specs);
    console.log("workDays", wdays);
    console.log("workHours", workHours);

    console.log({
      name,
      surname,
      pesel,
      email,
      phoneNumber,
      pwz,
      degree, 
      specialization: specs,
      workDays: wdays,
      workHours
  })
        try{
            const response = await axiosPrivate.post(ADD_DOCTOR_URL, {
                name,
                surname,
                pesel,
                email,
                phoneNumber,
                pwz,
                degree, 
                specialization: specs,
                workDays: wdays,
                workHours
            });
            console.log("odpowiedz z serwera: ", response.data);
        }catch (error){
            console.log("UPS");
            console.log(error);
        }


    //await sendDoctorData({ name, surname, phoneNumber, email, pesel, pwz, degree, specialization : specs, workDays : wdays, workHours });
  };

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
          p: 2,
        }}
      >
        <Card variant="outlined">
          <Typography variant="h4" sx={{ mb: 2 }}>
            Dodaj lekarza
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {/* Imię */}
            <FormControl>
              <FormLabel htmlFor="name">Imię</FormLabel>
              <TextField
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateName(name, setNameErrorMessage, setNameOk)}
                error={!nameOk && nameErrorMessage !== ''}
                helperText={nameErrorMessage}
              />
            </FormControl>

            {/* Nazwisko */}
            <FormControl>
              <FormLabel htmlFor="surname">Nazwisko</FormLabel>
              <TextField
                id="surname"
                name="surname"
                required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                onBlur={() =>
                  validateName(surname, setSurnameErrorMessage, setSurnameOk)
                }
                error={!surnameOk && surnameErrorMessage !== ''}
                helperText={surnameErrorMessage}
              />
            </FormControl>

            {/* Numer telefonu */}
            <FormControl>
              <FormLabel>Numer telefonu</FormLabel>
              <TextField
                type="tel"
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
                error={!phoneNumberOk && phoneNumberErrorMessage !== ''}
                helperText={phoneNumberErrorMessage}
              />
            </FormControl>

            {/* Adres email */}
            <FormControl>
              <FormLabel htmlFor="email">Adres email</FormLabel>
              <TextField
                id="email"
                name="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  validateEmail(email, setEmailErrorMessage, setEmailOk);
                }}
                error={!emailOk && emailErrorMessage !== ''}
                helperText={emailErrorMessage}
              />
            </FormControl>

            {/* PESEL */}
            <FormControl>
              <FormLabel htmlFor="pesel">PESEL</FormLabel>
              <TextField
                id="pesel"
                name="pesel"
                required
                value={pesel}
                onChange={(e) => setPesel(e.target.value)}
                onBlur={() => {
                  validatePesel(pesel, setPeselErrorMessage, setPeselOk);
                }}
                error={!peselOk && peselErrorMessage !== ''}
                helperText={peselErrorMessage}
              />
            </FormControl>

            {/* PWZ */}
            <FormControl>
              <FormLabel htmlFor="pwz">PWZ</FormLabel>
              <TextField
                id="pwz"
                name="pwz"
                required
                value={pwz}
                onChange={(e) => setPwz(e.target.value)}
                onBlur={() => {
                  validatePwz(pwz, setPwzErrorMessage, setPwzOk);
                }}
                error={!pwzOk && pwzErrorMessage !== ''}
                helperText={pwzErrorMessage}
              />
            </FormControl>

            {/* Stopień naukowy (MUI Select) */}
            <FormControl>
              <FormLabel>Wykształcenie</FormLabel>
              <Select
                value={degree}
                onChange={(e) => {
                  setDegree(e.target.value);
                  setDegreeErrorMessage('');
                  setDegreeOk(true);
                }}
                onBlur={() => {
                  if (!degree) {
                    setDegreeErrorMessage('Wybierz stopień naukowy');
                    setDegreeOk(false);
                  } else {
                    setDegreeErrorMessage('');
                    setDegreeOk(true);
                  }
                }}
                error={!degreeOk && degreeErrorMessage !== ''}
              >
                {doctorDegrees.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2" color="error">
                {degreeErrorMessage}
              </Typography>
            </FormControl>

            {/* Specjalizacje (wielokrotny wybór) */}
            <FormControl>
              <FormLabel>Specjalizacja/Specjalizacje</FormLabel>
              <Select
                multiple
                value={specialization}
                onChange={(e) => {
                  const { value } = e.target;
                  setSpecialization(
                    typeof value === 'string' ? value.split(',') : value
                  );
                  setSpecializationErrorMessage('');
                  setSpecializationOk(true);
                  console.log(specialization);
                }}
                onBlur={() => {
                  if (specialization.length === 0) {
                    setSpecializationErrorMessage(
                      'Wybierz co najmniej jedną specjalizację'
                    );
                    setSpecializationOk(false);
                  } else {
                    setSpecializationErrorMessage('');
                    setSpecializationOk(true);
                  }
                }}
                error={!specializationOk && specializationErrorMessage !== ''}
              >
                {doctorSpecializations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2" color="error">
                {specializationErrorMessage}
              </Typography>
            </FormControl>

            {/* Dni pracy (wielokrotny wybór) */}
            <FormControl>
              <FormLabel>Dni pracy</FormLabel>
              <Select
                multiple
                value={workDays}
                onChange={(e) => {
                  const { value } = e.target;
                  setWorkDays(
                    typeof value === 'string' ? value.split(',') : value
                  );
                  setWorkDaysErrorMessage('');
                  setWorkDaysOk(true);
                }}
                onBlur={() => {
                  if (workDays.length === 0) {
                    setWorkDaysErrorMessage(
                      'Wybierz co najmniej jeden dzień pracy'
                    );
                    setWorkDaysOk(false);
                  } else {
                    setWorkDaysErrorMessage('');
                    setWorkDaysOk(true);
                  }
                }}
                error={!workDaysOk && workDaysErrorMessage !== ''}
              >
                {weekDays.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body2" color="error">
                {workDaysErrorMessage}
              </Typography>
            </FormControl>

            {/* Jeśli wybrano co najmniej 1 dzień pracy – ustawiamy godziny pracy */}
            {workDays.length !== 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Godziny pracy (co 15 min):
                </Typography>
                {workDays.map((day) => {
                  const isError = workHoursErrors[day]; // czy mamy błąd end < start
                  return (
                    <Box
                      key={day}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        border: isError ? '1px solid red' : 'none',
                        borderRadius: 1,
                        p: isError ? 1 : 0,
                      }}
                    >
                      <Typography sx={{ width: '100px' }}>
                        {weekDays.find((d) => d.value === day)?.label}
                      </Typography>

                      {/* START */}
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          value={workHours[day]?.start || ''}
                          onChange={(e) =>
                            handleWorkHoursChange(day, 'start', e.target.value)
                          }
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>Start</em>
                          </MenuItem>
                          {availableTimes.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {/* END */}
                      <FormControl sx={{ minWidth: 120 }}>
                        <Select
                          value={workHours[day]?.end || ''}
                          onChange={(e) =>
                            handleWorkHoursChange(day, 'end', e.target.value)
                          }
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>Koniec</em>
                          </MenuItem>
                          {availableTimes.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {/* Komunikat błędu wewnątrz boxa, jeśli end < start */}
                      {isError && (
                        <Typography variant="body2" color="error">
                          Godzina końcowa nie może być wcześniejsza niż początkowa
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </>
            )}

            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Zatwierdź
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => {
                XD();
              }}
            >
              Lognij se byku
            </Button>
          </Box>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}
