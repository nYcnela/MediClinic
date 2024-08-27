import axios from 'axios';

export async function sendCheckRequest(data, endpoint,setError,setStatus){
    try{
        const response = await axios.post(endpoint, {
            data,
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

const registrationEndpoint = 'https://localhost:5000/register'
export async function sendRegistrationData(name,surname, phoneNumber, email, pesel, password){
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