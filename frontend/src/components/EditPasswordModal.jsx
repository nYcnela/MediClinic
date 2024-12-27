import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Zmień hasło i e-mail</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nowe hasło"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="E-mail"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default EditPasswordModal;