import Button from "../components/Button";
import LabelInputParagraph from "../components/labelInputParagraph";
import React,{useState} from "react";
import {validatePesel, validateName, validatePhoneNumber, validateEmail, sendCheckRequest,validatePassword } from "../functions/validations";
import {phoneNumberErrorText, emailErrorText, passwordErrorText } from "../assets/strings";

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
            console.log("odpowiedz z zserwa: ", response.data);
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
                onChange={(e) => {
                    setName(e.target.value);                    
                }}
                onBlur = {()=>{
                    const communicate = validateName(name)
                    if(communicate !== "ok"){
                        setNameError(communicate)
                        setNameStatus(false)
                    }else{
                        setNameError("")
                        setNameStatus(true)
                        
                    }
                }
                }   
                paragraphText= {nameError}
                required 
            />
            <LabelInputParagraph 
                id = "surname"
                type = "text" 
                value = {surname}         
                labelText = "Nazwisko: "
                onChange={(e) => {
                    setSurname(e.target.value);
                }}
                onBlur={()=>{
                    const communicate = validateName(surname);
                    if(communicate !== "ok"){
                        setSurnameError(communicate)
                        setSurnameStatus(false)
                    }else{
                        setSurnameError("")
                        setSurnameStatus(true)
                    }
                }
                }
                paragraphText= {surnameError}
                required 
            />
            <LabelInputParagraph  
                id = "pesel"
                type = "text" 
                value = {pesel}            
                labelText = "Pesel: "
                onChange={(e) => {
                    setPesel(e.target.value)
                }}
                onBlur={() => {
                        if(!validatePesel(pesel)){
                            setPeselError("Pesel nie jest poprawny")
                            setPeselStatus("false")
                        }else{
                            if(sendCheckRequest(pesel,'http://localhost:5000/check-pesel',setPeselError)){
                                setNameStatus(true)
                            }else{
                                setPeselStatus("false")
                            }
                        }
                    }   
                }
                paragraphText={peselError}
                required 
            />
            <LabelInputParagraph    
                id = "phoneNumber"   
                type = "tel"     
                value = {phoneNumber}    
                labelText = "Numer telefonu: "
                onChange={(e) => {
                    setPhoneNumber(e.target.value)
                }}
                onBlur={()=>{
                    if(validatePhoneNumber(phoneNumber)){
                        if(sendCheckRequest(phoneNumber, 'http://localhost:5000/check-phone-number',setPhoneNumberError)){
                            setPhoneNumberStatus(true);
                        }else{
                            setPeselStatus("false")
                        }
                        
                    } else {
                        setPhoneNumberError(phoneNumberErrorText )
                        setPhoneNumberStatus(true);
                    }
                    
                }}
                paragraphText={phoneNumberError}
                required 
            />
            <LabelInputParagraph   
                id = "emailAddress"
                type = "email"   
                value = {email}          
                labelText = "Email: "
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                onBlur={()=>{
                    if(validateEmail(email)){
                        if(sendCheckRequest(email,'http://localhost:5000/check-email',setEmailError)){
                            setEmailStatus(true)    
                        }else{
                            setEmailStatus(false)  
                        }
                    } 
                    else{
                        setEmailError(emailErrorText)
                        setEmailStatus(true)
                    } 
                }}
                paragraphText={emailError}
                required 
            />
            <LabelInputParagraph   
                id = "password"
                type = "password"   
                value = {password}          
                labelText = "Hasło: "
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                onBlur={()=>{
                    if(validatePassword(password)){
                        setPasswordStatus(true)
                        setPasswordError("")
                    }else{
                        setPasswordStatus(false)
                        setPasswordError(passwordErrorText)
                    }
                }}
                paragraphText={passwordError}
                required 
            />

            <Button
                type = "submit"
                text = "Zarejestruj się"
            />
        </form>
    );
}

export default RegisterForm;


