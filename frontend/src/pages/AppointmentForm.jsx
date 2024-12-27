import React, { useState, useEffect } from "react";
import { Typography, Button, CssBaseline, Box, TextField } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import NavBar from "../components/NavBar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GradientContainer } from './sign-in/SignIn';
import ItemCategorySearchBar from "./ItemCategorySearchBar";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import AppointmentCard from "../components/AppointmentCard";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  height: '80%',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '70%',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function AppointmentForm(props) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [availableTerms, setAvailableTerms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (selectedDoctor === null && selectedSpecialization === null) {
      setIsSearchButtonDisabled(true);
    } else {
      setIsSearchButtonDisabled(false);
    }
  }, [selectedDoctor, selectedSpecialization]);

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy HH:mm');
    console.log(date);
    console.log(formattedDate);
    setFormattedDate(formattedDate);
    setSelectedDate(date);
  };

  const handleSearchClick = () => {
    const appointments = selectedDoctor === null ? getAppointmentsBySpecAndDate() : " XDDDDDDDD";
    console.log(appointments);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <GradientContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <Card>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Szukaj wizyty
            </Typography>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Wybierz lekarza lub specjalizację:
            </Typography>
            <ItemCategorySearchBar
              getItemsLink='http://localhost:5000/doctor/list'
              getCategoriesLink='http://localhost:5000/doctor/specializations'
              getItemsByCategoryIdLink=''
              getItemCategoriesByItemIdLink=''
              itemsField='doctors'
              categoriesField='specializations'
              setItem={setSelectedDoctor}
              setCategory={setSelectedSpecialization}
              
            />
            <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
              Wyszukaj wolny termin:
            </Typography> 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
              sx={{ width: "80%"}}
                label="Wybierz datę"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            <Button
              
              variant="outlined"
              color="primary"
              sx={{ width: "80%", marginTop : "2%"}}
              disabled={isSearchButtonDisabled}
            >
              Szukaj
            </Button>
            {/* Renderowanie dostępnych terminów */}
            {availableTerms.length >= 0 && (
              <Box sx={{ mt: 2, width: '80%' }}>
                <Typography variant="h6">Dostępne terminy:</Typography>
                {/* Renderowanie dostępnych terminów */}
                <AppointmentCard
                  title="lek. Katarzyna Lachowska"
                  specialties="Pediatra"
                  data="09.08.2024 17:00"
                />
              </Box>
            )}
          </Box>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default AppointmentForm;