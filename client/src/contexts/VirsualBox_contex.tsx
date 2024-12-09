import React, { createContext, ReactNode, useContext, useState } from "react";


// Handling VirsualBox in mutilple conponents.
type VirsualBox_Context_type = {
    isOpen: boolean,
    HandleOpenBox: () => void
}

const VirsualBox_Context = createContext<VirsualBox_Context_type | undefined>(undefined)

type VirsualBox_Props = {
    children: ReactNode
}

const defaulContext: VirsualBox_Context_type = {
    isOpen: false,
    HandleOpenBox: () => {
        console.log("Default context !")
    }
}

export const VirsualBox_Provider: React.FC<VirsualBox_Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const HandleOpenBox = function () {
        setIsOpen(!isOpen);
    }
    return (
        < VirsualBox_Context.Provider value={{ isOpen, HandleOpenBox }}>
            {children}
        </VirsualBox_Context.Provider>)
}
export default VirsualBox_Context

export const useVirsualBox_context = () => {
    const VBContext = useContext(VirsualBox_Context)

    if (!VBContext) {
        return defaulContext
    }

    return VBContext
}