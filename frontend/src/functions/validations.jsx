import axios from 'axios';
import {phoneNumberErrorText, emailErrorText, passwordErrorText, pwzErrorText, sexErrorText } from "../assets/strings";
import { sendCheckRequest } from './requests';

export function validatePesel(pesel, setError, setStatus, setValue){
    pesel = pesel.replaceAll(" ","")
    if(pesel.length == 0){
        setError("")
        setStatus(false);
        return;
    }
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

    sendCheckRequest(pesel,"pesel",setError, setStatus)
}

export function validateName(name, setError, setStatus, setValue){
    if(name.trim() == ""){
        setError("")
        setStatus(false)
        return;
    }else if(!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(name)){
        setError("Pole może zawierać tylko litery")
        setStatus(false)
        return;
    }else if(name.length < 2){
        setError("Imie musi składać się z więcej niż jednej litery")
        setStatus(false)
        return;
    }
    setError("")
    setStatus(true)
}

export function validatePhoneNumber(number, setError, setStatus, setValue){
    const continuousNumber = number.replaceAll(" ","");
    let ok = true;
    let validNumber = "";
    if(continuousNumber.length == 0){
        setError("");
        setStatus(false);
        return;
    }
    
    if(continuousNumber.startsWith("0048") && continuousNumber.length == 13){
        const digits = continuousNumber.slice(4);
        digits.split().forEach((element) =>{
            if(isNaN(Number(element))){
                ok = false
                setError("Zawiera znaki inne niż cyfry!");
                setStatus(false);
                return;
            }
        }
        )
        if (!ok) return; 
        validNumber = "+48"+digits;
    }else if(continuousNumber.startsWith("+48") && continuousNumber.length == 12){
        const digits = continuousNumber.slice(3)
        digits.split().forEach((element) =>{
            if(isNaN(Number(element))){
                ok = false
                setError("Zawiera znaki inne niż cyfry!")   
                setStatus(false);
                return;
            }
        } 
        )
        if (!ok) return; 
        validNumber = continuousNumber;
    }else if(continuousNumber.length == 9){
        continuousNumber.split().forEach((element) =>{
            if(isNaN(Number(element))){
                ok = false
                setError("Zawiera znaki inne niż cyfry!")   
                setStatus(false);
                return;
            }
        } 
        )
        if (!ok) return; 
        validNumber = "+48"+continuousNumber
    }else{
        setError(phoneNumberErrorText)   
        setStatus(false);
        return;
    }

    setValue(validNumber)
    sendCheckRequest(validNumber,"phoneNumber",setError,setStatus);

}

export function validateEmail(email, setError, setStatus, setValue){
    const lowercasedEmail = String(email).toLowerCase()
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(lowercasedEmail.match(regexp)){
        sendCheckRequest(lowercasedEmail, "email", setError, setStatus)
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

export function validatePwz(pwz,setError,setStatus,setValue){
    if(pwz.length == 0){
        setStatus(false)
        setError("")
        return
    }
    if(pwz.length == 7){
        pwz.split().forEach(e => {
            if(Number(e).isNaN){
                setStatus(false)
                setError(pwzErrorText)
                return
            }
        })
        setStatus(true)
        setError("") 
    }else{
        setStatus(false)
        setError(pwzErrorText)
    }
}   


export function validateSex(value,setError,setStatus,setValue){
    if(value === "") {
        setError(sexErrorText)
        setStatus(false)
        return;
    }
    setError("")
    setStatus(true)
} 


export function validateWorkHours(value,setError,setStatus,setValue){
    
}
