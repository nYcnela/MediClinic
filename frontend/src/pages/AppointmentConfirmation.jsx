import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AppointmentConfirmation({}){
    const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false)
    const handleClick = () =>{
        setConfirmed(!confirmed);
    }

    const {id} = useParams();
    const object = {
        doctor: "dr nauk chujowych andrzej macierewicz",
		specialties: "endokrynolog, chujolog",
		data: "09.02.2032 17:32"
    }
    const pacjent = {
        id: "123456",
        name: "Jan Kowalski",
        pesel: "03351232094"
      }
      
    return !confirmed ? (
      <div>
        <h1>Potwierdzenie wizyty</h1>
        <p>Lekarz: {object.doctor}</p>
        <p>Specjalizacja: {object.specialties}</p>
        <p>Data: {object.data}</p>
        <p>Pacjent: {pacjent.name}</p>
        <p>PESEL: {pacjent.pesel}</p>
        <p>Data: {object.data}</p>
        <Button text={"Potwierdz wizyte"} onClick={handleClick} />
      </div>
    ) : (
      <div>
        <h2>Wizyta została umówiona</h2>
        <Button
          text={"Wróć do strony głównej"}
          onClick={() => {
            navigate(`/`);
          }}
        />
      </div>
    );
  };

export default AppointmentConfirmation;