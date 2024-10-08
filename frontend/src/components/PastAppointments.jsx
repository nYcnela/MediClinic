import React from "react";

function PastAppointments() {
  const pastAppointments = [
    { id: 1, date: "2023-09-12", doctor: "Dr. Nowak", summary: "Kontrola zdrowia" },
    { id: 2, date: "2023-08-05", doctor: "Dr. Kowalska", summary: "Wizyta kontrolna" },
  ];

  return (
    <div className="past-appointments">
      <h2>Odbyte wizyty</h2>
      <ul>
        {pastAppointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.doctor} <br />
            Podsumowanie: {appointment.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PastAppointments;
