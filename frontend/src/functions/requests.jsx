import axios from 'axios';
    
export async function sendCheckRequest(data,type,setError,setStatus){
    const checkEndpoint = 'http://localhost:5000/auth/check-user'
    try{
        const response = await axios.post(checkEndpoint, {
            data,
            type,
        });
        if(!response.data.exists){
            setError("")
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

    const registrationEndpoint = 'http://localhost:5000/auth/register'

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

export async function sendDoctorData(name,surname,phoneNumber,email,pesel,pwz,degree, specialization,workDays,workHours){

    const endpoint = 'http://localhost:5000/doctor/add'

    event.preventDefault();
        try{
            const response = await axios.post(endpoint, {
                name,
                surname,
                pesel,
                email,
                phoneNumber,
                pwz,
                degree, 
                specialization,
                workDays,
                workHours
            });
            console.log("odpowiedz z serwera: ", response.data);
        }catch (error){
            console.log("UPS");
            console.log(error);
        }
}

export async function filterItemsByCategory(category){
    const endpoint = 'endpoint'
    try{
        const response = await axios.post(endpoint, {
            category
        });
        return response.doctors
    }catch (error){
        console.log(error.response ? error.response.data.message : error.message);
    }
}
export async function getAppointmentsBySpecAndDate(spec, date){
    const endpoint = 'endpoint'
    try{
        const response = await axios.post(endpoint, {
            spec,
            date
        });
        return response.doctors
    }catch (error){
        console.log(error.response ? error.response.data.message : error.message);
    }
}
