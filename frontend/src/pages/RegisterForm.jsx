import Button from "../components/Button";
import LabelInputParagraph from "../components/LabelInputParagraph";
import React,{useState} from "react";
import NavBar from '../components/NavBar';
import {validatePesel, validateName, validatePhoneNumber, validateEmail, validatePassword } from "../functions/validations";
import {sendRegistrationData } from "../functions/requests";

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

    async function handleSubmit(event){

        event.preventDefault();

        if(nameStatus&&surnameStatus&&peselStatus&&emailStatus&&phoneNumberStatus&&passwordStatus){
            console.log('Rejestracja powiodła się');
            sendRegistrationData(name,surname,phoneNumber,email,pesel,password)
        }else{
            console.log("Rejestarcja nie powiodła się")
        }

    };
    
    

    return(
        <div>
            <NavBar/>
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
        </div>
    );
}

export default RegisterForm;


