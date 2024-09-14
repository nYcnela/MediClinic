import Button from "../components/Button";
import LabelInputParagraph from "./LabelInputParagraph";
import {validatePesel, validateName, validatePhoneNumber, validateEmail, validatePassword, validatePwz, validateSex } from "../functions/validations";
import {doctorDegrees, doctorSpecializations, weekDays, genders } from "../assets/strings";
import React,{useState, useEffect} from "react";
import LabelSelectParagraph from "./LabelSelectParagraph";
import LabelRadiosParagraph from "./LabelRadioParagraph"; 
import NavBar from "./NavBar";
import { createHoursWithStep } from "../functions/timeFunctions";

import WorkHoursPicker from "./WorkHoursPicker";
import RangePicker from "./RangePicker";


//płeć 
//specjalizacja
// numer pwz
// 
function DoctorCreateForm(){

    const hours = createHoursWithStep("8:00", "16:00", 15)

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [nameStatus, setNameStatus] = useState(false);
    
    const [surname, setSurname] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [surnameStatus, setSurnameStatus] = useState(false);

    const [pesel, setPesel] = useState("");
    const [peselError, setPeselError]  = useState("");
    const [peselStatus, setPeselStatus] = useState(false)

    const [pwz, setPwz] = useState("");
    const [pzwError, setPwzError]  = useState("");
    const [pwzStatus, setPwzStatus] = useState(false)

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
    const [degreeError, setDegreeError] = useState("");
    const [degreeStatus, setDegreeStatus] = useState(false);

    const [specialization, setSpecialization] = useState([]);
    const [specializationError, setSpecializationError] = useState("");
    const [specializationStatus, setSpecializationStatus] = useState(false);


    const [workDays, setWorkDays] = useState([]);
    const [workDaysError, setWorkDaysError] = useState("");
    const [workDaysStatus, setWorkDaysStatus] = useState(false);
    
    const [sex, setSex] = useState("");
    const [sexError, setSexError] = useState("");
    const [sexStatus, setSexStatus] = useState(false);

    const [workHours, setWorkHours] = useState({
        monday: { start: "", end: "" },
        tuesday: { start: "", end: "" },
        wednesday: { start: "", end: "" },
        thursday: { start: "", end: "" },
        friday: { start: "", end: "" },
        saturday: { start: "", end: "" },
        sunday: { start: "", end: "" }
    })


    
    async function handleSubmit(event){

        event.preventDefault();
        console.log(name,surname,phoneNumber,email,pesel,pwz,sex,degree, specialization,workDays,workHours)
        sendDoctorData(name,surname,phoneNumber,email,pesel,pwz,sex,degree, specialization,workDays,workHours)
        

    };
    
    return(
        <div>
            <button onClick={ ()=>  console.log(workHours)}>XDDDDD</button>
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
                    id = "pwz"
                    type = "text" 
                    value = {pwz}            
                    labelText = "Numer PWZ: "
                    paragraphText={pzwError}
                    validateMethod = {validatePwz}
                    setValueMethod={setPwz}
                    setErrorMethod={setPwzError}
                    setStatusMethod={setPwzStatus}
                />

                <LabelRadiosParagraph   
                    id = "sex"
                    options = {genders}      
                    labelText = "Płeć: "     
                    paragraphText=""
                    setValue={setSex}
                    value = {sex}
                    validateMethod={validateSex}
                    setErrorMethod={setSexError}
                    setValueMethod={setSexError}

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
                
                <LabelSelectParagraph
                    id = "degree"
                    options = {doctorDegrees}
                    labelText="Wykształcenie: "
                    paragraphText=""
                    setValue={setDegree}
                    isMulti={false}
                />

                <LabelSelectParagraph
                    id = "specializations"
                    options = {doctorSpecializations}
                    labelText="Specjalizacja/Specjalizacje: "
                    paragraphText=""
                    setValue={setSpecialization}
                    isMulti={true}
                />
                <LabelSelectParagraph
                    id = "workDays"
                    options = {weekDays}
                    labelText="Dni pracy: "
                    paragraphText=""
                    setValue={setWorkDays}
                    isMulti={true}
                />
                
                {
                    workDays.length != 0 ?
                    <>
                    <p>Godziny pracy:</p>
                        {workDays.map(e =>{
                            return(
                                <RangePicker
                                label = {e.label}
                                field = {e.value}
                                options = {hours}
                                labelOne = "Od: "
                                labelTwo = "Do: "
                                startRangeField = "start"
                                endRangeField = "end"
                                object = {workHours}
                                setObject = {setWorkHours}
                            />
                            );
                            
                        })}
                    </>
                    
                    
                    :
                    <></>
                }
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
                    text = "Dodaj lekarzyne pedała"
                />
            </form>
        </div>
    )
}


export default DoctorCreateForm;