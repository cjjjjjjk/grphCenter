import React from "react";
import { Route, Routes, BrowserRouter, NavLink } from "react-router-dom";
import Calculator from "./Calcurlator";


const Home: React.FC = function () {
    return (
        <div className='flex h-full items-center mx-auto px-6 md:px-8 lg:max-w-[1216px] lg:px-0'>
            <main className="flex bg-white h-full flex-col justify-between font-sans text-neutral-900">
                <div className="py-8 md:py-9 xl:py-[80px]">
                    <h1 className="text-[20px] font-medium text-gray-500"><b>grphCenter:</b> network graph calcurlator</h1>
                    <p className="text-[44px] font-bold text-black">amazing way to learn graph theory</p>
                </div>
            </main>
        </div>
    );
}

export default Home