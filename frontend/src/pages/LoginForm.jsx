import React, {useState} from 'react'
import LabelInputParagraph from '../components/labelInputParagraph';
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
                const response = await axios.post('cipciaLalunia', {
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
                <LabelInputParagraph
                    id = "username"
                    type = "text"
                    value = {username}
                    labelText = "Nazwa użytkownika"
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur = {console.log("haha")}   
                    paragraphText= ""
                />
                <LabelInputParagraph
                    id = "password"
                    type = "password"
                    value = {password}
                    labelText = "Hasło"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur = {console.log("haha")}   
                    paragraphText= ""
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
