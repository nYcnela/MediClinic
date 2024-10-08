import React from "react";

function UpcomingAppointmentsList() {

  const appointments = [
    { id: 1, date: "2024-10-12", time: "17.00", subject: "Dr. Nowak" },
    { id: 2, date: "2024-11-05", time: "17.00", subject: "Dr. Kowalska" },
  ];

  return (
    <div className="upcoming-appointments">
      <h2>Nadchodzące wizyty</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date}, {appointment.time} - {appointment.subject}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingAppointmentsList;
