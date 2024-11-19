import { createContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({children}) => {
    const [data,setData] = useState({});
    return(
        <UserDataContext.Provider value={{data, setData}}>
            {children}
        </UserDataContext.Provider>
    )
} 

export default UserDataContext;