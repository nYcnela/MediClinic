import FullCalendar from "@fullcalendar/react"; // Główna biblioteka kalendarza
import dayGridPlugin from "@fullcalendar/daygrid"; // Widok kalendarza w siatce dni
import timeGridPlugin from "@fullcalendar/timegrid"; // Widok kalendarza z osiami czasu
import interactionPlugin from "@fullcalendar/interaction"; // Interakcje użytkownika (np. dodawanie, przeciąganie zdarzeń)
import { calendarViews } from "../assets/calendarSettings";
import { useState } from "react";
import DeleteAppointmentModal from "./DeleteAppointmentModal";


const DoctorCallendar = () => {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Kutas kozła",
      start: "2024-11-22 15:00",
      end: "2024-11-22 15:15",
    },
    { title: "Twoja stara", date: "2024-11-23 13:45" },
  ]);

  
  

  const handleDateClick = (arg) => {
    const newEventTitle = prompt("Wprowadź nazwę wydarzenia:");
    if (newEventTitle) {
      setEvents([...events, { title: newEventTitle, date: arg.dateStr }]);
    }
  };
  
  function handleEventClick(clickInfo) {
    setIsModalOpen(true);
  }

  return (
    <div className="calendar-container" id = "calldupa">
      <FullCalendar
        plugins={[timeGridPlugin]} 
        
        views={calendarViews}
        initialView="timeGridSevenDay" 
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridSevenDay,timeGridDay", 
        }}
        buttonText={{
          timeGridSevenDay: 'Tygodniowy', 
          timeGridDay: 'Dzienny'
        }}
        events={events} 
        editable={true} 
        selectable={true} 
        locale="pl" 
        height="auto" 
        aspectRatio={2}
        eventClick={handleEventClick}
      />
      <DeleteAppointmentModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      ></DeleteAppointmentModal>
      
    </div>
    
  );
};

export default DoctorCallendar;
