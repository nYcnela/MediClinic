import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edytuj dane osobowe</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          <TextField
            label="Imię i nazwisko"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Data urodzenia"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">Anuluj</Button>
            <Button type="submit" color="primary">Zapisz</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditPersonalDataModal;