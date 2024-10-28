import React, { useState,useRef } from "react";
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
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log(response);
      console.log(response?.data?.token);
      const token = response?.data?.token;
      const roles = [2001];
      setAuth({username, password, roles, token});
      setUsername("");
      setPassword("");
      navigate('/profile')
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  }

  return (
    <section>
      <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
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
    </section>
  );
}

export default Login;
