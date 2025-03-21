import React, { useEffect, useState } from "react";
import { Typography, Button, CssBaseline, Container } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import PersonalData from "../components/PersonalData";
import UpcomingAppointmentsList from "../components/UpcomingAppointmentsList";
import PastAppointments from "../components/PastAppointments";
import EditPersonalDataModal from "../components/EditPersonalDataModal";
import EditPasswordModal from "../components/EditPasswordModal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";

import { GradientContainer } from "./sign-in/SignIn";

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
    width: "70%",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

function PacientProfilePage() {
  const [isEditPersonalDataOpen, setEditPersonalDataOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const handleEditPersonalData = () => setEditPersonalDataOpen(true);
  const handleEditPassword = () => setEditPasswordOpen(true);
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const userId = auth.id;
  useEffect(() => {
    try {
      axios.get(`/appointment/user-appointments/${userId}`).then((response) => {
        console.log(response.data);
        setUpcomingAppointments(response.data.upcomingAppointments);
        setPastAppointments(response.data.pastAppointments);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <NavBar />
      <GradientContainer>
        <Card>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Profil Pacjenta
          </Typography>
          <section sx={{ minWidth: "100%" }}>
            <PersonalData onEdit={handleEditPersonalData} />
            {/*
            {isEditPersonalDataOpen && (
              <EditPersonalDataModal
                isOpen={isEditPersonalDataOpen}
                onClose={() => setEditPersonalDataOpen(false)}
              />
            )}
            */
            }
            
            <UpcomingAppointmentsList 
              upcomingAppointmentsList={upcomingAppointments}
            />
            <PastAppointments 
              pastAppointmentsList={pastAppointments}
            />
          </section>
          {isEditPasswordOpen && (
            <EditPasswordModal
              isOpen={isEditPasswordOpen}
              onClose={() => setEditPasswordOpen(false)}
            />
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleEditPassword}
          >
            Zmień hasło
          </Button>
        </Card>
      </GradientContainer>
    </AppTheme>
  );
}

export default PacientProfilePage;
