import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function AppointmentCard({ title, specialties, data}){
    const navigate = useNavigate();
    const handleClick = () => {
        const wizytaId = 123; // Na przykład ID wizyty, które chcesz przekazać
        navigate(`/confirm-appointment/${wizytaId}`);
      };

    return (
      <div style={{ border: '2px solid black', width:'30%', margin: "1% 1% 1% 1%", padding: "1% 1% 1% 1%" }}>
        <div className="doctor-info">
          <h3 className="doctor-name">{title}</h3>
          <p className="doctor-specialties">{specialties}</p>
        </div>
        <div>Data wizyty: {data}</div>
        <br></br>
        <Button type = "submit" text = "Wybierz wizyte" onClick = {handleClick}></Button>
      </div>

    );
  };

export default AppointmentCard;