import Button from "../components/Button";
import LabelInputParagraph from "./LabelInputParagraph";
import {validatePesel, validateName, validatePhoneNumber, validateEmail, validatePassword } from "../functions/validations";
import { doctorDegrees, doctorSpecializations,doctorSpecializations1 } from "../assets/strings";
import React,{useState} from "react";
import LabelSelect from "./LabelSelect";
import NavBar from "./NavBar";
import Select from 'react-select'

//płeć 
//specjalizacja
// numer pwz
// 
function DoctorCreateForm(){

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

    const [degree, setDegree] = useState("");

    const [specialization, setSpecialization] = useState([]);
    
    async function handleSubmit(event){

        event.preventDefault();

        if(nameStatus&&surnameStatus&&peselStatus&&emailStatus&&phoneNumberStatus&&passwordStatus){
            console.log('wal sie na cycunieczki')
            sendRegistrationData(name,surname,phoneNumber,email,pesel,password)
        }else{
            console.log("wal sie na cyce")
        }

    };
    
    return(
        <div>
            <h1>Dodaj lekarza</h1>
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

                <LabelSelect
                    id = "degree"
                    options = {doctorDegrees}
                    labelText="Wykształcenie:"
                    paragraphText = ""
                    setValue={setDegree}
                    value = {degree}
                    isMulti={false}
                />

                <LabelSelect
                    id = "specialization"
                    options = {doctorSpecializations}
                    labelText="Specjalizacja/Specjalizacje:"
                    paragraphText = ""
                    setValue={setSpecialization}
                    value = {specialization}
                    isMulti={true}
                />

                <Select
                    options={doctorSpecializations1}
                    onChange={(elements) => {
                        elements.forEach((e) => console.log(e.value))
                    }}
                    isMulti = {true}
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
                
                <Button
                    type = "submit"
                    text = "Zarejestruj się"
                />
            </form>
        </div>
    )
}


export default DoctorCreateForm;