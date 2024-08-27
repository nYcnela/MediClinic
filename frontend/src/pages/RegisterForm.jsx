import Button from "../components/Button";
import LabelInputParagraph from "../components/labelInputParagraph";
import React,{useState} from "react";
import {validatePesel, validateName, validatePhoneNumber, validateEmail, sendCheckRequest, validatePassword } from "../functions/validations";


import axios from 'axios';

function RegisterForm(){

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [nameStatus, setNameStatus] = useState(false);
    
    const [surname, setSurname] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [surnameStatus, setSurnameStatus] = useState(false);

    const [pesel, setPesel] = useState("");
    const [peselError, setPeselError]  = useState("");
    const [peselStatus, setPeselStatus] = useState(false)

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailStatus, setEmailStatus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [phoneNumberStatus, setPhoneNumberStatus] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordStatus, setPasswordStatus] = useState(false);

    //to sobie przekleilem z loginu zebym byl w stanie przesylac requesta
    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/register', {
                name,
                surname,
                pesel,
                email,
                phoneNumber,
                password
            });
            console.log("odpowiedz z serwera: ", response.data);
        }   catch (error){
            console.log(error.message);
            }
    };
    
    

    return(
        <form onSubmit={handleSubmit}>
            <LabelInputParagraph
                id = "name"
                type = "text"
                value= {name}
                labelText = "Imię: "   
                paragraphText= {nameError}
                validateMethod = {validateName}
                setValueMethod={setName}
                setErrorMethod={setNameError}
                setStatusMethod={setNameStatus}
            />
            <LabelInputParagraph 
                id = "surname"
                type = "text" 
                value = {surname}         
                labelText = "Nazwisko: "
                paragraphText= {surnameError}
                validateMethod = {validateName}
                setValueMethod={setSurname}
                setErrorMethod={setSurnameError}
                setStatusMethod={setSurnameStatus}
            />
            <LabelInputParagraph  
                id = "pesel"
                type = "text" 
                value = {pesel}            
                labelText = "Pesel: "
                paragraphText={peselError}
                validateMethod = {validatePesel}
                setValueMethod={setPesel}
                setErrorMethod={setPeselError}
                setStatusMethod={setPeselStatus}
            />
            <LabelInputParagraph    
                id = "phoneNumber"   
                type = "tel"     
                value = {phoneNumber}    
                labelText = "Numer telefonu: "
                paragraphText={phoneNumberError}
                validateMethod = {validatePhoneNumber}
                setValueMethod={setPhoneNumber}
                setErrorMethod={setPhoneNumberError}
                setStatusMethod={setPhoneNumberStatus}
            />
            
            <LabelInputParagraph   
                id = "emailAddress"
                type = "email"   
                value = {email}          
                labelText = "Email: "     
                paragraphText={emailError}
                validateMethod={validateEmail}
                setValueMethod={setEmail}
                setErrorMethod={setEmailError}
                setStatusMethod={setEmailStatus}
            />
            <LabelInputParagraph   
                id = "password"
                type = "password"   
                value = {password}          
                labelText = "Hasło: "
                paragraphText={passwordError}
                validateMethod={validatePassword}
                setValueMethod={setPassword}
                setErrorMethod={setPasswordError}
                setStatusMethod={setPasswordStatus}
            />
            <Button
                type = "submit"
                text = "Zarejestruj się"
            />
        </form>
    );
}

export default RegisterForm;


