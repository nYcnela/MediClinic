import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {validatePassword}  from "../functions/validations";


function EditPasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");
  const [passwordOk, setPasswordOk] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { auth } = useAuth();
  const id = auth.id;
  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== passwordConfirmation) {
      setPasswordError("Hasła nie są takie same");
      setPasswordOk(false);
      return;
    }

    try {
      axiosPrivate.patch(`/user/update/password/${id}`, 
        { password }
      ).then((response) => {
        console.log(response.data);
      });
      window.alert("Hasło zostało zmienione");
      onClose(); // Zamknięcie po zapisaniu
    }
    catch (error) {
      console.error(error);
    }
    
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Zmień hasło</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nowe hasło"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e)=>validatePassword(e.target.value, setPasswordError, setPasswordOk)}
            fullWidth
            helperText={passwordError}
            color={passwordOk ? "primary" : "error"}
            error={!passwordOk}
          />

          <TextField
            label="Potwierdź hasło"
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            helperText={passwordError}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            color={passwordOk ? "primary" : "error"}
            fullWidth
            error={!passwordOk}
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