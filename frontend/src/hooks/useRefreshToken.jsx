import axios from '../axios/axios';
import useAuth from './useAuth';

useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return {...prev, token: response.data.token}
        })
        return response.data.token;
    }

    return refresh;
}

export default useRefreshToken;