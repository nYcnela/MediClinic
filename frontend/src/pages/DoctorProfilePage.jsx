import React, { useState } from "react";
import { Typography, CssBaseline, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import SwitchSelector from "react-switch-selector";
import UpcomingAppointmentsList from "../components/UpcomingAppointmentsList";
import DoctorCallendar from "../components/DoctorCallendar";
import NavBar from "../components/NavBar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GradientContainer } from './sign-in/SignIn';

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
    width: '70%',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

function DoctorProfilePage() {
  const [isListViewChoosen, setIsListViewChoosen] = useState(true);
  const options = [
    {
      label: <span>Widok listy</span>,
      value: "list",
      selectedBackgroundColor: "#0097e6",
    },
    {
      label: <span>Widok harmonogramu</span>,
      value: "harmo",
      selectedBackgroundColor: "#fbc531"
    }
  ];
  const data = {
    name: "Jan",
    surname: "Żołnowski",
    degree: "dr. n. med",
    specializations: ["Ortopedia"],
    phoneNumber: "+48 730 560 543",
    email: "dzon@gmail.com"
  };

  const onChange = (newValue) => {
    setIsListViewChoosen(!isListViewChoosen);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <NavBar />
      <GradientContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
        <Card>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Profil lekarza
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              Dane osobowe
            </Typography>
            <Typography variant="body1"><strong>Imię:</strong> {data.name}</Typography>
            <Typography variant="body1"><strong>Nazwisko:</strong> {data.surname}</Typography>
            <Typography variant="body1"><strong>Stopień naukowy:</strong> {data.degree}</Typography>
            <Typography variant="body1">
              <strong>{data.specializations.length === 1 ? "Specjalizacja:" : "Specjalizacje:"}</strong> {data.specializations.join(", ")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              Dane kontaktowe
            </Typography>
            <Typography variant="body1"><strong>Numer telefonu:</strong> {data.phoneNumber}</Typography>
            <Typography variant="body1"><strong>Adres email:</strong> {data.email}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            Nadchodzące wizyty
          </Typography>
          <Box sx={{ width: '100%', mb: 2 }}>
            <SwitchSelector
              onChange={onChange}
              options={options}
              initialSelectedIndex={0}
              backgroundColor={"#353b48"}
              fontColor={"#f5f6fa"}
            />
          </Box>
          <Box sx={{ width: '100%', flexGrow: 1 }}>
            {isListViewChoosen ? <UpcomingAppointmentsList /> : <DoctorCallendar />}
          </Box>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default DoctorProfilePage;