import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRippleEffect } from "../effect/ripple";

const MainHeader: React.FC = function () {

    const location = useLocation()
    const hideHeader = location.pathname === '/calcurlator'
    const addrippleEffect = useRippleEffect()

    return (
        <>
            {!hideHeader &&
                <header className="sticky top-0 z-50 h-[72px] flex justify-center bg-white border-b shadow-sm shadow-gray-400" >
                    <div className="h-full max-w-[60rem] w-[95%] flex items-center justify-between">
                        <NavLink to="/">
                            <button className="font-bold mr-4 text-black text-[1.75rem] font-sans relative overflow-hidden"
                                onClick={(e) => { addrippleEffect(e) }}>gr<u>ph<a className="text-[1.75rem] text-red-700">₵</a>enter</u></button>
                        </NavLink>
                        <div className="h-full max-w-[12rem] w-[30%] flex flex-row items-center justify-between">
                            <NavLink to="/calcurlator">
                                <button type="button" className="text-[0.9rem] bg-white  px-[0.5rem] h-[2.75rem] text-[#0A5EB0] rounded-full transition-colors duration-300  border hover:border-black hover:bg-black hover:text-white ">calcurlator
                                </button>
                            </NavLink>
                            <NavLink to={location.pathname !== "/login" ? "/login" : "/"}>
                                <button type="button" className="text-[0.9rem] bg-white px-[0.75rem] h-[2.75rem] text-[#0A5EB0] rounded-full transition-colors duration-300  hover:text-[#0A5EB0] hover:font-bold hover:bg-[#EBEAFF] ">{location.pathname === "/login" ? "• home" : "• login"}
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </header>
            }
        </>
    );
}

export default MainHeader