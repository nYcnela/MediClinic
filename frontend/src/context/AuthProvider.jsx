import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const logout = () => {
        setAuth(null);
      };
    
    return(
        <AuthContext.Provider value={{auth, logout, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;