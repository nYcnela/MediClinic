import axios from 'axios';
import {phoneNumberErrorText, emailErrorText, passwordErrorText } from "../assets/strings";
import { sendCheckRequest } from './requests';

export function validatePesel(pesel, setError, setStatus, setValue){
    const peselEndpoint = 'http://localhost:5000/check-pesel'
    pesel = pesel.replaceAll(" ","")
    if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
        setError("Pesel nie jest poprawny")
        setStatus(false);
        return;
    }

    const wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let suma = 0;
    
    for (let i = 0; i < 10; i++) {
        suma += parseInt(pesel[i]) * wagi[i];
    }

    const cyfraKontrolna = (10 - (suma % 10)) % 10;

    if(cyfraKontrolna !== parseInt(pesel[10])){
        setError("Pesel nie jest poprawny")
        setStatus(false);
        return
    }

    sendCheckRequest(pesel,peselEndpoint,setError, setStatus)
}

export function validateName(name, setError, setStatus, setValue){
    if(name.trim() == ""){
        setError("To pole nie może być puste")
        setStatus(false)
    }else if(!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(name)){
        setError("Pole może zawierać tylko litery")
        setStatus(false)
    }else if(name.length < 2){
        setError("Imie musi składać się z więcej niż jednej litery")
        setStatus(false)
    }
    setStatus(true)
}

export function validatePhoneNumber(number, setError, setStatus, setValue){
    const endpoint = 'http://localhost:5000/check-phone-number'
    const continuousNumber = number.replaceAll(" ","");
    let validNumber = "";
    if(continuousNumber.startsWith("0048") && continuousNumber.length == 13){
        const digits = continuousNumber.slice(4);
        digits.split().forEach((element) =>{
            if(isNaN(Number(element))){
                setError("Zawiera znaki inne niż cyfry!");
                setStatus(false);
                return;
            }
        } 
        )
        validNumber = "+48"+digits;
    }else if(continuousNumber.startsWith("+48") && continuousNumber.length == 12){
        const digits = continuousNumber.slice(3)
        digits.split().forEach((element) =>{
            if(isNaN(Number(element))){
                setError("Zawiera znaki inne niż cyfry!")   
                setStatus(false);
                return;
            }
        } 
        )
        validNumber = continuousNumber;
    }else if(continuousNumber.length == 9){
        continuousNumber.split().forEach((element) =>{
            if(isNaN(Number(element))){
                setError("Zawiera znaki inne niż cyfry!")   
                setStatus(false);
                return;
            }
        } 
        )
        validNumber = "+48"+continuousNumber
    }else{
        setError(phoneNumberErrorText)   
        setStatus(false);
        return;
    }

    sendCheckRequest(validNumber,endpoint,setError,setStatus);

}

export function validateEmail(email, setError, setStatus, setValue){
    const endpoint = 'http://localhost:5000/check-email'
    const lowercasedEmail = String(email).toLowerCase()
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(lowercasedEmail.match(regexp)){
        sendCheckRequest(lowercasedEmail, endpoint, setError, setStatus)
    }else{
        setError(emailErrorText)   
        setStatus(false);
    }
}


export function validatePassword(password,setError,setStatus,setValue){
    if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)){
        setStatus(true)
        setError("")
    }else{
        setStatus(false)
        setError(passwordErrorText)
    }
}   

