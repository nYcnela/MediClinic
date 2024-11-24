import { createContext, useEffect, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [data,setData] = useState({});
    const [auth, setAuth] = useState({});
    useEffect(() => {
        if(!auth){
            setData(null);
        }
    }, [auth]);
    return(
        <UserDataContext.Provider value={{data, setData}}>
            {children}
        </UserDataContext.Provider>
    )
} 

export default UserDataContext;