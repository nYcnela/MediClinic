import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, List, ListItem, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Tooltip from "@mui/material/Tooltip";
import MuiCard from "@mui/material/Card";
import { use } from "react";

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
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[800],
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
function DoctorUpcomingAppointmentsList({ upcomingAppointmentsList }) {
  const axiosPrivate = useAxiosPrivate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const sortedAppointments = upcomingAppointmentsList
      .slice()
      .sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
    setUpcomingAppointments(sortedAppointments);
  }, [upcomingAppointmentsList]);


  
  

  return (
    <Card>
      <Typography variant="h5" component="h2">
        Nadchodzące wizyty
      </Typography>
      {upcomingAppointments.length === 0 && (
        <Typography variant="body1">Brak nadchodzących wizyt</Typography>
      )}
      <List>
        {upcomingAppointments.map((appointment, index) => (
          <ListItem
           key={index}>
            <Typography variant="body1">
              Pacjent - {appointment.user.label}  <br></br>
              Data - {appointment.appointmentTime}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
DoctorUpcomingAppointmentsList.propTypes = {
  upcomingAppointmentsList: PropTypes.array.isRequired,
};

export default DoctorUpcomingAppointmentsList;
