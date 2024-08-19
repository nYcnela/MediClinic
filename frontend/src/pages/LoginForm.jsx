import React, {useState} from 'react'
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
function LoginForm(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    async function handleSubmit(event){
            event.preventDefault();
            setLoading(true);
            setError(null);

            try{
                const response = await axios.post('http://localhost:5000/login', {
                    username,
                    password,
                });
                console.log("odpowiedz z zserwa: ", response.data);
                setSuccess(true);
            }   catch (error){
                setError(error.response ? error.response.data.message : error.message);
                } finally {
                    setLoading(false);
                }
            };

            
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <InputField
                    id = "username"
                    label = "Nazwa użytkownika"
                    type = "text"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    id = "password"
                    label = "Hasło"
                    type = "password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type = "submit"
                    text = "Zaloguj się"
                />
            </form>
        </div>
    );
}

export default LoginForm;