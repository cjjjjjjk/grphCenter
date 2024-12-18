import React, { createContext, useContext, useState, ReactNode } from "react";


type UserContext_type = {
    username: string,
    SetUserName: (user_name: string) => void,
    userid?: string,
    useremail?: string,
}
type User_Props = { children: ReactNode }
const defaulContext: UserContext_type = {
    username: 'guest',
    SetUserName: () => {
        console.log('Use as Guest Mode')
    }
}

const UserContext = createContext<UserContext_type>(defaulContext)

export const UserProvider: React.FC<User_Props> = ({ children }) => {
    const [username, setUserName] = useState<string>('')
    const [useremail, setUserEmail] = useState<string>('')
    const [userid, setUserId] = useState<string>('')


    const SetUserName = function (user_name: string) {
        setUserName(user_name);
    }


    return <UserContext.Provider value={{ username, SetUserName, useremail, userid }}>
        {children}
    </UserContext.Provider>
}
export default UserContext
export const useUserContext = () => {
    const UserLoginContext = useContext(UserContext)
    if (!UserLoginContext) return defaulContext;
    return UserLoginContext
}