import React from "react";
import { NavLink } from "react-router-dom";


const ToolHeader: React.FC = function () {

    return (
        <header className="sticky top-0 z-50 h-[70px] bg-color-custom border-b border-neutral-600 ">
            <div className="flex items-center justify-between h-full px-8">


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
        </header>
    )
}
export default ToolHeader