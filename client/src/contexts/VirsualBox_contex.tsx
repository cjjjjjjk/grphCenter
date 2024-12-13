import React, { createContext, ReactNode, useContext, useState } from "react";

import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

// Handling VirsualBox in mutilple conponents.
type VirsualBox_Context_type = {
    // Box display constroler
    isOpen: boolean,
    HandleOpenBox: () => void
    // -------- graph data
    baseNodes?: CustomNode[],
    baseLinks?: CustomLink[],
    SetGraphData?: (nodes: CustomNode[], links: CustomLink[]) => void
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
    const [baseNodes, setBaseNodes] = useState<CustomNode[]>([])
    const [baseLinks, setBaseLinks] = useState<CustomLink[]>([])

    const SetGraphData = function (nodes: CustomNode[], links: CustomLink[]) {
        setBaseNodes(nodes);
        setBaseLinks(links)
    }
    const HandleOpenBox = function () {
        setIsOpen(!isOpen);
    }
    return (
        < VirsualBox_Context.Provider value={{ isOpen, HandleOpenBox, baseNodes, baseLinks, SetGraphData }}>
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