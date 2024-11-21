import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//effects
import { useRippleEffect } from "../effect/ripple";

interface ToolHeaderProps {
    graphType: (value: string) => void
}

const ToolHeader: React.FC<ToolHeaderProps> = function ({ graphType }) {
    // effects
    const addrippleEffect = useRippleEffect()

    const [showGraphSelection, setShowGraphSelection] = useState(false)

    // design handler
    const hanldleGraphSelection = function () {
        setShowGraphSelection(!showGraphSelection)
    }

    return (
        <header className="fixed top-0 z-50 h-[2.5rem] w-full bg-white pl-[1rem] pr-[1rem] App-font text-[1rem] border-b shadow-sm shadow-black ">
            <div className="w-full h-full flex ">
                <div className="flex items-center">
                    <button className="fonr-bold mr-2 text-black text-[1.5rem]">≡</button>
                    <button className="font-bold mr-4 text-black text-[1rem] font-sans relative overflow-hidden"
                        onClick={(e) => { addrippleEffect(e) }}>gr<u>ph<a className="text-[1rem] text-red-700">₵</a>enter</u></button>

                    <div className="relative flex flex-col items-start ">
                        <button className={`flex h-3/5 w-[6.5rem] items-center border border-black rounded-full pl-[0.5rem] hover:text-white hover:font-bold hover:bg-black relative overflow-hidden ${showGraphSelection ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}
                            onClick={(e) => {
                                hanldleGraphSelection();
                                addrippleEffect(e)
                            }}>
                            <span className="z-100 text-[0.75rem]">🥠 import</span>
                            <svg className="fill-current size-6" aria-hidden="true" viewBox="0 0 24 24">
                                <path d={showGraphSelection ? "M7,15L12,10L17,15H7Z" : "M7,10L12,15L17,10H7Z"}></path>
                            </svg>
                        </button>

                        {/* Bảng lựa chọn */}
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
                        <button className="h-[1.5rem] w-[4rem] rounded-full px-[0.2rem] hover:text-white hover:bg-black hover:font-bold transition-colors duration-500">sign in</button>
                    </NavLink>
                </div>
            </div>
        </header >
    )
}
export default ToolHeader