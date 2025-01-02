import {axiosPrivate} from '../axios/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axiosPrivate.post('/auth/refresh-token',{}, {withCredentials: true});
        console.log("XD",response);
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