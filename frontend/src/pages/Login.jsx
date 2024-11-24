import React, { useState,useRef } from "react";
import LabelInputParagraph from "../components/LabelInputParagraph";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import axios from "../axios/axios"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import useUserData from "../hooks/useUserData";
import { upperCaseFirstLetter } from "../functions/stringFunctions";

const LOGIN_URL = "/auth/login";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const userRef = useRef();
  const errRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { auth, setAuth } = useAuth();
  const {setData} = useUserData();

  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password,
      });
      console.log(response);
      const token = response?.data?.token;
      const {email, iat, name, surname, birthDay, role} = jwtDecode(token);
      const roles = [role];
      setAuth({id, user, roles, token,iat});
      setData({name: upperCaseFirstLetter(name), surname: upperCaseFirstLetter(surname), email, birthDay});
      setUser("");
      setPassword("");
      if(roles.find((role => role === 'admin'))){
        navigate('/admin-home');
      }else{
        navigate('/');
      }
      
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
          value={user}
          labelText="Login"
          paragraphText=""
          setValueMethod={setUser}
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
    )

}

export default Login;
