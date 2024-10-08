import React, { useState } from "react";

function EditPersonalDataModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "Jan Kowalski",
    dob: "1980-05-12",
    email: "jan.kowalski@example.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementacja zapisu danych
    console.log(formData);
    onClose(); // Zamknięcie po zapisaniu
  };

  return (
    <div className="modal">
      <h2>Edytuj dane osobowe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Imię i nazwisko:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Data urodzenia:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Zapisz</button>
        <button onClick={onClose}>Anuluj</button>
      </form>
    </div>
  );
}

export default EditPersonalDataModal;
