import React from "react";
import useUserData from "../hooks/useUserData";

function PersonalData({ onEdit }) {
  const {data} = useUserData();

  return (
    <div className="personal-data">
      <h2>Dane osobowe</h2>
      <p>Imię i nazwisko: {data.name + " " + data.surname}</p>
      <p>Data urodzenia: {data.birthDay}</p>
      <p>E-mail: {data.email}</p>
      <button onClick={onEdit}>Edytuj dane osobowe</button>
    </div>
  );
}

export default PersonalData;
