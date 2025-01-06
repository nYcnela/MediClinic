import React, { useEffect, useState } from "react";
import { Typography, CssBaseline, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import SwitchSelector from "react-switch-selector";
import DoctorUpcomingAppointmentsList from "../components/DoctorUpcomingAppointmentsList";
import DoctorCallendar from "../components/DoctorCallendar";
import NavBar from "../components/NavBar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GradientContainer } from './sign-in/SignIn';
import useUserData from "../hooks/useUserData";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth"; 
import { format } from "date-fns";

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
  
  const axiosPrivate = useAxiosPrivate();
  const { data } = useUserData();
  const { auth } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [doctorSpecializations, setDoctorSpecializations] = useState([]);
  const [doctorDegree, setDoctorDegree] = useState("");
  {/*}
  const data = {
    name: "Dzon",
    surname: "Doe",
    degree: "dr. n. med",
    specializations: ["Ortopedia"],
    phoneNumber: "+48 730 560 543",
    email: "dzon@gmail.com"
  };
  */}
  useEffect(() => { 
    try {
      axiosPrivate.get(`/doctor/${auth.id}?specializations=true`).then((response) => {
        console.log(response.data);
        setDoctorDegree(response.data.doctor.label.split(' ')
        .slice(0, -2)
        .join(' '));
        setDoctorSpecializations(response.data.doctor.specializations);
        console.log("XD",doctorSpecializations);
        console.log("ZSS",doctorDegree);

      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    try {
      const startDateObj = new Date();
      startDateObj.setMonth(startDateObj.getMonth() - 2);
      const endDateObj = new Date();
      endDateObj.setMonth(endDateObj.getMonth() + 2);
  
      axiosPrivate
        .post(`/appointment/booked/${auth.id}`, {
          startDate: format(startDateObj, "yyyy-MM-dd HH:mm:ss"),
          endDate: format(endDateObj, "yyyy-MM-dd HH:mm:ss")
        })
        .then((response) => {
          console.log(response.data.appointments);
          setUpcomingAppointments(response.data.appointments);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);


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
            <Typography variant="body1"><strong>Stopień naukowy:</strong> {doctorDegree}</Typography>
            <Typography variant="body1"><strong>Specjalizacje:</strong> {doctorSpecializations.map((e)=>e.name).join(", ")}</Typography>
            <Typography variant="body1"><strong>Data urodzin:</strong> {data.birthDay}</Typography>
            <Typography variant="body1">
            
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
            {isListViewChoosen ? 
            <DoctorUpcomingAppointmentsList 
              upcomingAppointmentsList={upcomingAppointments} 
            /> 
            : 
            <DoctorCallendar
              upcomingAppointmentsList={upcomingAppointments}
            />}
          </Box>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default DoctorProfilePage;