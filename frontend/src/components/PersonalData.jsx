import React from "react";

function PersonalData({ onEdit }) {
  const user = {
    name: "Jan Kowalski",
    dob: "1980-05-12",
    email: "jan.kowalski@example.com",
  };

  return (
    <div className="personal-data">
      <h2>Dane osobowe</h2>
      <p>Imię i nazwisko: {user.name}</p>
      <p>Data urodzenia: {user.dob}</p>
      <p>E-mail: {user.email}</p>
      <button onClick={onEdit}>Edytuj dane osobowe</button>
    </div>
  );
}

export default PersonalData;
