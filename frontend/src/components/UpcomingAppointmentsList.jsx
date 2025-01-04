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
function UpcomingAppointmentsList({ upcomingAppointmentsList }) {
  const axiosPrivate = useAxiosPrivate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    const sortedAppointments = upcomingAppointmentsList
      .slice()
      .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time));
    setUpcomingAppointments(sortedAppointments);
  }, [upcomingAppointmentsList]);

  const handleAppointmentCancel = async (appointmentId) => {
    try {
      axiosPrivate.delete(`/appointment/${appointmentId}`).then((response) => {
        console.log(response.data);
        setUpcomingAppointments(
          upcomingAppointments.filter(
            (appointment) => appointment.id !== appointmentId
          )
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isLessThan24Hours = (date) => {
    const appointmentDate = new Date(date);
    const now = new Date();
    const differenceInMs = appointmentDate - now;
    return differenceInMs < 24 * 60 * 60 * 1000;
  };

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
          <ListItem key={index}>
            <Typography variant="body1">
              {appointment.appointment_time} - {appointment.doctor.degree}{" "}
              {appointment.doctor.name} {appointment.doctor.surname}
            </Typography>
            <Tooltip
              title={
                isLessThan24Hours(appointment.appointment_time)
                  ? "Nie można odwołać wizyty na mniej niż 24 godziny przed"
                  : ""
              }
            >
              <span>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleAppointmentCancel(appointment.id)}
                  disabled={isLessThan24Hours(appointment.appointment_time)}
                >
                  Odwołaj wizytę
                </Button>
              </span>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
UpcomingAppointmentsList.propTypes = {
  upcomingAppointmentsList: PropTypes.array.isRequired,
};

export default UpcomingAppointmentsList;
