import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//effects ------------------------
import { useRippleEffect } from "../effect/ripple";
// -------------------------------
interface ToolHeaderProps {
    graphType: (value: string) => void,
    showMenu: (value: boolean) => void,
}


// Main component =====================================================
// header tool : import, export graphs handle -------------------------
const ToolHeader: React.FC<ToolHeaderProps> = function ({ graphType, showMenu }) {
    // user infor
    const [username, SetUserName] = useState<string>('guest')

    // design effects ----------
    const addrippleEffect = useRippleEffect()
    // states
    const [showGraphSelection, setShowGraphSelection] = useState(false)
    const [isSHowMenu, setShowMenu] = useState<boolean>(false)

    // handlers
    const hanldleGraphSelection = function () {
        setShowGraphSelection(!showGraphSelection)
    }
    const handleShowMenu = function () {
        setShowMenu(!isSHowMenu)
        if (showGraphSelection) hanldleGraphSelection()
        showMenu(!isSHowMenu)
    }

    useEffect(() => {
        const username_sessionstorage = sessionStorage.getItem('username')
        if (username_sessionstorage) SetUserName(username_sessionstorage);
    }, [])

    // Handling login button
    const Handling_LoginButtonLabel = function (): string {
        if (username !== 'guest') return username
        else return 'sign in';
    }
    // ----------------------------------------------------

    return (
        <header className="fixed top-0 z-50 h-[2.5rem] w-full bg-white pl-[0.75rem] pr-[1rem] App-font text-[1rem] border-b shadow-sm shadow-black ">
            <div className="w-full h-full flex ">
                <div className="flex items-center">
                    <button className="relative overflow-hidden mr-2 text-black text-[1.5rem]"
                        onClick={(e) => {
                            addrippleEffect(e)
                            handleShowMenu()
                        }
                        }>≡</button>
                    <button className="font-bold mr-4 text-black text-[1rem] font-sans relative overflow-hidden"
                        onClick={(e) => { addrippleEffect(e) }}>gr<u>ph<a className="text-[1rem] text-red-700">₵</a>enter</u></button>

                    <div className="relative flex flex-col items-start ">
                        <button className={`flex h-3/5 w-[6rem] items-center border border-black rounded-full pl-[0.5rem] hover:text-white hover:font-bold hover:bg-black relative overflow-hidden ${showGraphSelection ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}
                            onClick={(e) => {
                                hanldleGraphSelection();
                                if (isSHowMenu) handleShowMenu()
                                addrippleEffect(e)
                            }}>
                            <span className="z-100 text-[0.75rem]">🥠 type</span>
                            <svg className="fill-current size-6" aria-hidden="true" viewBox="0 0 24 24">
                                <path d={showGraphSelection ? "M7,15L12,10L17,15H7Z" : "M7,10L12,15L17,10H7Z"}></path>
                            </svg>
                        </button>


                        {showGraphSelection && (
                            <div className="absolute top-[1.8rem] z-50 w-[10rem] bg-white shadow-sm shadow-gray-700 border-l-2 border-gray-800 rounded-r-sm">
                                <div className="flex flex-col py-2 text-[0.75rem]">
                                    <button className="w-full whitespace-nowrap text-black text-left hover:bg-black hover:text-white hover:font-bold pl-2 mb-1"
                                        onClick={() => {
                                            graphType("directed");
                                            hanldleGraphSelection()
                                        }}>directed graph</button>
                                    <button className="w-full whitespace-nowrap text-black text-left hover:bg-black hover:text-white hover:font-bold pl-2"
                                        onClick={() => {
                                            graphType("undirected")
                                            hanldleGraphSelection();
                                        }}>undirected graph</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/*Navigate buttons */}
                <div className="flex flex-row items-center h-full ml-auto text-[0.75rem] ">
                    <NavLink to='/'>
                        <button className="h-[1.5rem] w-[4rem] rounded-full px-[0.2rem] hover:text-white hover:bg-black hover:font-bold transition-colors duration-500 text-center">home</button>
                    </NavLink>
                    <span className="mr-1">|</span>
                    <NavLink to='/login'>
                        <button className="h-[1.5rem] w-[4rem] rounded-full px-[0.2rem] hover:text-white hover:bg-black hover:font-bold transition-colors duration-500">{Handling_LoginButtonLabel()}</button>
                    </NavLink>
                </div>
            </div>
        </header >
    )
}
export default ToolHeader