import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";


const Home: React.FC = function () {



    return (
        <div className='flex min-h-screen mx-auto px-[0.5rem] md:px-[1rem] lg:max-w-[960px] lg:px-0'>
            <main className="flex bg-white h-full flex-col font-sans text-neutral-900 ">
                <div className="pt-8 md:pt-9 xl:pt-[80px]">
                    <h1 className="text-[20px] font-medium text-gray-500"><b>grphCenter:</b> network graph calcurlator</h1>
                    <p className="text-[44px] font-bold text-black">amazing way to learn graph theory</p>
                </div>
                <NavLink to={'/calcurlator'}>
                    <div className="w-full pt-[1rem] bg-white h-[5rem]">
                        <button className="bg-white  h-[4rem] w-[10rem] rounded-full shadow-sm shadow-gray-500 text-[#4CB9E7] hover:text-[#0C356A] text-[1.2rem] hover:bg-[#EEF5FF] transition-colors duration-400">carculator →</button>
                    </div>
                </NavLink>
            </main>
        </div>
    );
}

export default Home