import React, { useState } from "react";
import { NavLink } from "react-router-dom";

interface ToolHeaderProps {
    graphType: (value: string) => void
}

const ToolHeader: React.FC<ToolHeaderProps> = function ({ graphType }) {
    const [showGraphSelection, setShowGraphSelection] = useState(false)
    const [showInputDialog, setShowInputDialog] = useState(false)

    // design handler
    const hanldleGraphSelection = function () {
        setShowGraphSelection(!showGraphSelection)
    }

    return (
        <header className="sticky top-0 z-50 h-[70px] bg-color-custom border-b border-neutral-300 ">
            <div className="flex items-center justify-between h-full px-8">
                {/*Tool buttons*/}
                <div className="h-full flex items-center gap-4">
                    <button className="h-full App-logo">gr<u>phCenter</u></button>
                    <div className="relative h-full flex items-center">
                        {/* Nút Import */}
                        <button
                            className={`flex h-3/5 pl-3 pr-2 items-center border border-neutral-300 rounded-full hover:bg-white hover:text-orange-500 hover:border-orange-500 ${showGraphSelection ? 'bg-white' : ''}`}
                            onClick={hanldleGraphSelection}>
                            <span>🥠 import</span>
                            <svg className="fill-current size-6" aria-hidden="true" viewBox="0 0 24 24">
                                <path d={showGraphSelection ? "M7,15L12,10L17,15H7Z" : "M7,10L12,15L17,10H7Z"}></path>
                            </svg>
                        </button>

                        {/* Bảng lựa chọn */}
                        {showGraphSelection && (
                            <div className="absolute top-full mt-0 left-0 bg-white border-neutral-300 rounded-b-xl hover:rounded-b-xl border-x border-b  w-80 min-w-20 z-50">
                                <div className="flex flex-col h-full w-full items-start py-2">
                                    <button className="w-full hover:bg-slate-100 hover:text-blue-950 hover:font-bold text-[18px] pl-4 py-4 text-start  border-b "
                                        onClick={() => {
                                            graphType("directed");
                                            hanldleGraphSelection()
                                        }}>➡️ directed graph</button>
                                    <button className="w-full hover:bg-slate-100 hover:text-blue-950 hover:font-bold text-[18px] pl-4 py-4 text-start  "
                                        onClick={() => {
                                            graphType("undirected")
                                            hanldleGraphSelection();
                                        }}>⚒️ undirected graph</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/*Navigate buttons */}
                <div className="h-full ml-auto">
                    <NavLink to='/'>
                        <button className="h-full hover:font-bold text-xl mr-4">home</button>
                    </NavLink>
                    <NavLink to='/login'>
                        <button className="h-full hover:font-bold text-xl">sign in</button>
                    </NavLink>
                </div>
            </div>
        </header >
    )
}
export default ToolHeader