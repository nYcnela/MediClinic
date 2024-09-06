import axios from 'axios';

    
export async function sendCheckRequest(data,type,setError,setStatus){
    const checkEndpoint = 'http://localhost:5000/check-user'
    try{
        const response = await axios.post(checkEndpoint, {
            data,
            type,
        });
        if(response.data.exists){
            setError("Dane są poprawne")
            setStatus(true);
        }else{
            setError("Użytkownik o takim peselu widnieje już w bazie danych!")
            setStatus(false);
        }
        
    }catch (error){
        setError(error.response ? error.response.data.message : error.message);
        setStatus(false);
    }
};




export async function sendRegistrationData(name,surname, phoneNumber, email, pesel, password){

    const registrationEndpoint = 'https://localhost:5000/register'

    event.preventDefault();
        try{
            const response = await axios.post(registrationEndpoint, {
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
}