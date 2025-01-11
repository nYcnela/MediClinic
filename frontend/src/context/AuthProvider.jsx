import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const naviagate = useNavigate();
    const [auth, setAuth] = useState({})
    const logout = () => {
        setAuth(null);
        naviagate('/login');
      };
    
    return(
        <AuthContext.Provider value={{auth, logout, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;