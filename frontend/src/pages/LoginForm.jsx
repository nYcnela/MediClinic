import React, {useState} from 'react'
import LabelInputParagraph from '../components/LabelInputParagraph';
import NavBar from '../components/NavBar';
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
            <NavBar/>
            <form onSubmit={handleSubmit}>
                <LabelInputParagraph
                    id = "username"
                    type = "text"
                    value = {username}
                    labelText = "Nazwa użytkownika"
                    paragraphText= ""
                    setValueMethod={setUsername}
                />
                <LabelInputParagraph
                    id = "password"
                    type = "password"
                    value = {password}
                    labelText = "Hasło"   
                    paragraphText= ""
                    setValueMethod={setPassword}
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
