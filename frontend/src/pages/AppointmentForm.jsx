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
import { format, set } from 'date-fns';
import AppointmentCard from "../components/AppointmentCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { use } from "react";

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
  const [selectedDoctorLabel, setSelectedDoctorLabel] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedSpecializationLabel, setSelectedSpecializationLabel] = useState(null);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [availableTerms, setAvailableTerms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (selectedDoctor === null || selectedDate === null) {
      setIsSearchButtonDisabled(true);
    } else {
      setIsSearchButtonDisabled(false);
    }
    
  }, [selectedDoctor, selectedDate]);

 


  const handleDateChange = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    setFormattedDate(formattedDate);
    setSelectedDate(date);
  };


   const handleSearchClick =  async () => {
    setButtonClicked(true);
    try {
      const response = await axiosPrivate.post(`/appointment/schedule/${selectedDoctor}`, {  date: formattedDate });
      if(response.data.availableAppointments.length > 0) {
        setAvailableTerms(response.data.availableAppointments);
      }else{
        setAvailableTerms([]);
      }
    } catch (error) {
      console.error(error);
    }
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
              getItemsByCategoryLink='http://localhost:5000/doctor/specializations'
              itemsField='doctors'
              categoriesField='specializations'
              setItem={setSelectedDoctor}
              setCategory={setSelectedSpecialization}
              setItemLabel={setSelectedDoctorLabel}
              setCategoryLabel={setSelectedSpecializationLabel}
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
              onClick={handleSearchClick}
              variant="outlined"
              color="primary"
              sx={{ width: "80%", marginTop : "2%"}}
              disabled={isSearchButtonDisabled}
            >
              Szukaj
            </Button>
            {/* Renderowanie dostępnych terminów */}
            {availableTerms.length > 0 && (
              <Box sx={{ mt: 2, width: '80%' }}>
                <Typography variant="h6">Dostępne terminy:</Typography>
                {/* Renderowanie dostępnych terminów */}
                {availableTerms.map((term,index) => (
                  <AppointmentCard
                    key={index}
                    title={selectedDoctorLabel}
                    id={selectedDoctor}
                    specialties={selectedSpecializationLabel}
                    date={term}
                  />
                ))}
              </Box>
            )}
            {(availableTerms.length === 0 && buttonClicked)  && (
              <Box sx={{ mt: 2, width: '80%', textAlign: 'center', color: 'red' }}> 
                <Typography variant="h6" >Brak dostępnych terminów tego dnia</Typography>
              </Box>
            )}
          </Box>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default AppointmentForm;