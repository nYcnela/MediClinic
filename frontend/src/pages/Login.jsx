import React, { useState } from "react";
import LabelInputParagraph from "../components/LabelInputParagraph";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/login";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response)
    } catch (error) {
      console.log("no cumsz.......    ");
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  }

  if (localStorage.getItem("token")) {
    console.log("Niezalogowany");
    return (
      <div>
        <NavBar />
        <form onSubmit={handleSubmit}>
          <LabelInputParagraph
            id="username"
            type="text"
            value={username}
            labelText="Nazwa użytkownika"
            paragraphText=""
            setValueMethod={setUsername}
          />
          <LabelInputParagraph
            id="password"
            type="password"
            value={password}
            labelText="Hasło"
            paragraphText=""
            setValueMethod={setPassword}
          />
          <Button type="submit" text="Zaloguj się" />
        </form>
      </div>
    );
  } else {
    console.log("Zalogowany");
    navigate("/make-appointment");
  }
}

export default Login;
