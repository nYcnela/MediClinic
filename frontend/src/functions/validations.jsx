import axios from 'axios';


export function validatePesel(pesel){
    
    if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
        return false;
    }

    const wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let suma = 0;
    
    for (let i = 0; i < 10; i++) {
        suma += parseInt(pesel[i]) * wagi[i];
    }
    
    const cyfraKontrolna = (10 - (suma % 10)) % 10;

    return cyfraKontrolna === parseInt(pesel[10]);
}

export function validateName(name){

    if(name.trim() == ""){
        return "To pole nie może być puste"
    }else if(!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(name)){
        return "Pole może zawierać tylko litery"
    }else if(name.length < 2){
        return "Imie musi składać się z więcej niż jednej litery"
    }

    return 'ok';
}

export function validatePhoneNumber(number){
    const clearNumber = number.replaceAll(" ","")
    
    if(clearNumber.startsWith("0048") && clearNumber.length == 13){
        const digits = clearNumber.slice(4).split()
        digits.forEach((element) =>{
            if(isNaN(Number(element))){
                console.log("Zawiera znaki inne niż cyfry!")
                return false
            }
        } 
        )
        console.log(digits)
        return true
    }else if(clearNumber.startsWith("+48") && clearNumber.length == 12){
        const digits = clearNumber.slice(3).split()
        digits.forEach((element) =>{
            if(isNaN(Number(element))){
                console.log("Zawiera znaki inne niż cyfry!")
                return false
            }
        } 
        )
        console.log(digits)
        return true
    }else if(clearNumber.length == 9){
        const digits = clearNumber.split()
        digits.forEach((element) =>{
            if(isNaN(Number(element))){
                console.log("Zawiera znaki inne niż cyfry!")
                return false
            }
        } 
        )
        console.log(digits)
        return true
    }

    console.log("zly numer")
    return false
}

export function validateEmail(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}


export async function sendCheckRequest(data, endpoint,setErrorMethod){
        try{
            const response = await axios.post(endpoint, {
                data,
            });
            console.log("odpowiedz z z serwera: ", response.data);
            setErrorMethod("")
            return true;
        }catch (error){
            setErrorMethod(error.response ? error.response.data.message : error.message);
            return false;
        }
};


