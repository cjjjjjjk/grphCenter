import React, { createContext, ReactNode, useContext, useState } from "react";

import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

// Handling VirsualBox in mutilple conponents.
type VirsualBox_Context_type = {
    // Box display constroler
    mode: string,
    SetMode: (mode: string) => void,
    isUpdate?: boolean,
    isOpen: boolean,
    HandleOpenBox: (value?: boolean) => void
    // -------- graph data
    baseNodes?: CustomNode[],
    baseLinks?: CustomLink[],
    SetGraphData?: (nodes: CustomNode[], links: CustomLink[]) => void,


    // algorithsms ----------
    orderList?: string[],
    link_orderList?: string[],
    SetOrderList?: (value?: string[], link_value?: string[]) => void,

}

const VirsualBox_Context = createContext<VirsualBox_Context_type | undefined>(undefined)

type VirsualBox_Props = {
    children: ReactNode
}

const defaulContext: VirsualBox_Context_type = {
    mode: '',
    SetMode: () => { },
    isOpen: false,
    HandleOpenBox: () => {
        console.log("Default context !")
    }
}

export const VirsualBox_Provider: React.FC<VirsualBox_Props> = ({ children }) => {
    const [mode, setMode] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [baseNodes, setBaseNodes] = useState<CustomNode[]>([])
    const [baseLinks, setBaseLinks] = useState<CustomLink[]>([])

    // algorithsm ------
    const [orderList, setOrderList] = useState<string[]>([])
    const [link_orderList, setLink_orderList] = useState<string[]>([])
    const SetOrderList = function (nodepath?: string[], linkpath?: string[]) {
        if (nodepath) setOrderList(nodepath);
        if (linkpath) setLink_orderList(linkpath)
    }

    const SetMode = function (mode: string) {
        setMode(mode)
    }

    const SetGraphData = function (nodes: CustomNode[], links: CustomLink[]) {
        setBaseNodes(nodes);
        setBaseLinks(links)
        setIsUpdate(true)
    }
    const HandleOpenBox = function (check?: boolean) {
        setIsOpen(check !== undefined ? check : !isOpen);
        if (!isOpen || check === false) setIsUpdate(false)
    }
    return (
        < VirsualBox_Context.Provider value={{ isOpen, HandleOpenBox, mode, SetMode, baseNodes, baseLinks, SetGraphData, isUpdate, orderList, link_orderList, SetOrderList }}>
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