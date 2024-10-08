import React, { useState } from "react";

function EditPasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("jan.kowalski@example.com");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementacja zmiany hasła i e-maila
    console.log({ password, email });
    onClose(); // Zamknięcie po zapisaniu
  };

  return (
    <div className="modal">
      <h2>Zmień hasło i e-mail</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nowe hasło:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Zapisz</button>
        <button onClick={onClose}>Anuluj</button>
      </form>
    </div>
  );
}

export default EditPasswordModal;
