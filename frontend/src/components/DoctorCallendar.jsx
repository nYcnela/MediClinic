import FullCalendar from "@fullcalendar/react"; 
import timeGridPlugin from "@fullcalendar/timegrid"; 
import interactionPlugin from "@fullcalendar/interaction";
import { calendarViews } from "../assets/calendarSettings";
import { useEffect, useState } from "react";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import { parse, format, addMinutes } from "date-fns";
import PropTypes from "prop-types";
import "../assets/callendar.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const DoctorCallendar = ({upcomingAppointmentsList}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Wizyta u lekarza",
      start: "2024-11-27 15:00",
      end: "2024-11-27 15:15",
    },
  ]);

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => { 
    if (Array.isArray(upcomingAppointmentsList)) {
      const sortedAppointments = upcomingAppointmentsList
        .slice()
        .sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
      setUpcomingAppointments(sortedAppointments);
    }
  }, [upcomingAppointmentsList]);

  useEffect(() => {
    const newEvents = upcomingAppointments.map(appointment => {
      const startDate = parse(appointment.appointmentTime, "yyyy-MM-dd HH:mm", new Date());
      const endDate = addMinutes(startDate, 15);
      return {
        title: `${appointment.user.label}`,
        start: format(startDate, "yyyy-MM-dd HH:mm"),
        end: format(endDate, "yyyy-MM-dd HH:mm"),
      };
    });
    setEvents(newEvents);
  }, [upcomingAppointments]);

  const handleDateClick = (arg) => {
    const newEventTitle = prompt("Wprowadź nazwę wydarzenia:");
    if (newEventTitle) {
      setEvents([...events, { title: newEventTitle, date: arg.dateStr }]);
    }
  };
  
  function handleEventClick(clickInfo) {
    setIsModalOpen(true);
  }

  // Zmienne dostosowane do urządzeń mobilnych
  const viewName = isMobile ? "timeGridDay" : "timeGridSevenDay";
  const aspectRatioVal = isMobile ? 1 : 2;

  return (
    <div className="calendar-container" id="calldupa">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]} 
        views={calendarViews}
        initialView={viewName}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: isMobile ? "timeGridDay" : "timeGridSevenDay,timeGridDay"
        }}
        buttonText={{
          timeGridSevenDay: 'Tygodniowy', 
          timeGridDay: 'Dzienny'
        }}
        events={events}
        editable
        selectable
        locale="pl"
        height="auto"
        aspectRatio={aspectRatioVal}
        eventClick={handleEventClick}
      />
      <DeleteAppointmentModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

DoctorCallendar.propTypes = {
  upcomingAppointmentsList: PropTypes.array.isRequired,
};

export default DoctorCallendar;