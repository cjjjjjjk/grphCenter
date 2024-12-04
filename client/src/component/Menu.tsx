import React from "react";

interface Menu {
    exportPdf: () => void
}
const Menu: React.FC<Menu> = function ({ exportPdf }) {

    return (
        <div className="fixed z-100 top-[2.75rem] left-0 h-auto pb-[0.75rem] w-[10rem] rounded-r-md border-l-4 border-black shadow-md shadow-gray-600 bg-white flex transition-all duration-300 slide-in">
            <div className="w-full">
                <button className="w-full text-start px-[0.75rem] mt-[0.5rem] hover:bg-[#D7D3BF] hover:text-black hover:font-bold text-[0.75rem] text-gray-600"
                    onClick={() => { exportPdf() }}> 📄 export pdf</button>
                <hr />
                <button className="w-full text-start px-[0.75rem] mt-[0.5rem] hover:bg-[#D7D3BF] hover:text-black hover:font-bold text-[0.75rem] text-gray-600"> 🏳️ exit</button>
                <hr />
            </div>
        </div>
    )
}

export default Menu