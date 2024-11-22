import React, { useState } from "react";

// effects
import { useRippleEffect } from "../effect/ripple";
interface ComponentInputProps {
    graphType: string,
    className: string,
    dataHandler: (data: string) => void,
    NumberOfNode: (data: string) => void,
    ReDraw: (data: boolean) => void
    Exploration: (algorithm: string) => void
}

const InputDialog: React.FC<ComponentInputProps> = function ({ graphType, className, dataHandler, ReDraw, NumberOfNode, Exploration }) {
    const [isDrawed, seIsDrawed] = useState(false)
    const [data, setData] = useState("1 2 1\n1 3 4\n1 5 1\n2 4 2\n2 5 1\n3 4 3\n3 5 3\n4 5 2")
    const [numberOfNode, setNumberOfNodes] = useState("5")
    const [exploration, setExploration] = useState<string>("")

    // effects 
    const addrippleEffect = useRippleEffect()

    // handlers ---------------------
    const handleRedraw = () => {
        dataHandler(data);
        NumberOfNode(numberOfNode);
        if (isDrawed && data) ReDraw(true);
        if (data) seIsDrawed(true);
    };

    return (
        <div className={`${className} stop-0 left-0 w-[15rem] h-screen pr-[0.5rem] shadow-sm shadow-black text-black`}>
            <div className="pt-[2.5rem] pl-[1rem] overflow-hidden">
                <h3 className="mt-[0.5rem] text-[0.75rem]">import: {graphType} graph</h3>
                <hr className="mb-4" />
                <input
                    className="w-full h-[1.5rem] focus:outline-none mb-2 border border-black text-[0.75rem] pl-[0.5rem]" type="text" placeholder="number of nodes" autoFocus
                    onChange={(e) => { setNumberOfNodes(e.target.value) }}
                    defaultValue="5" />
                <textarea
                    className={`border border-black w-full p-2 focus:outline-none text-[0.75rem] ${isDrawed ? "h-[10rem]" : "h-[20rem]"} transition-all duration-400`}
                    placeholder="each line for an edge &#10;(v1 v2 w) &#10;example:&#10;1 2 1&#10;1 3 4&#10;1 5 1&#10;2 4 2&#10;2 5 1&#10;3 4 3&#10;3 5 3&#10;4 5 2"
                    style={{
                        whiteSpace: 'pre-wrap',
                    }}
                    defaultValue="1 2 1&#10;1 3 4&#10;1 5 1&#10;2 4 2&#10;2 5 1&#10;3 4 3&#10;3 5 3&#10;4 5 2"
                    onChange={(e) => { setData(e.target.value) }}
                ></textarea>
                <div className="flex justify-end">
                    {isDrawed && <button
                        className="relative overflow-hidden mr-4 px-4 text-[0.75rem] py-1 font-bold bg-white text-black border border-black hover:border-white transition-all rounded-full hover:bg-red-600 hover:text-white whitespace-nowrap duration-500"
                        onClick={(e) => {
                            addrippleEffect(e);

                        }}>clear</button>}
                    <button
                        className={`relative overflow-hidden px-4 text-[0.75rem] py-1 font-bold bg-white text-black border border-black hover:border-white transition-all rounded-full hover:bg-black hover:text-white whitespace-nowrap duration-500`}
                        onClick={(e) => {
                            setExploration("")
                            Exploration("")
                            addrippleEffect(e)
                            handleRedraw();
                            if (isDrawed && data) ReDraw(true);
                            if (data) seIsDrawed(true);
                        }}>
                        {isDrawed && data ? "draw again" : "draw"}
                    </button>
                </div>
                {isDrawed && <div className="flex flex-col items-start text-[0.75rem] mt-[1rem]">
                    <div className="flex mb-[0.2rem]"><h3><u>graph exploration</u></h3><button className="ml-[1rem] bg-black hover:bg-green-600 rounded-full w-[1.2rem] text-white text-center hover:cursor-pointer">?</button></div>
                    <button
                        className={`w-full text-left hover:underline transition-color duration-500  whitespace-nowrap ${exploration === "mst" ? "underline bg-black text-white" : "hover:text-[#003161]"}`}
                        onClick={() => { setExploration("mst"); Exploration("mst") }}>{">>"}mst</button>
                    <button
                        className={`w-full text-left hover:underline transition-color duration-500   whitespace-nowrap ${exploration === "haminton" ? "underline bg-black text-white" : "hover:text-[#003161]"}`}
                        onClick={() => { setExploration("haminton"); Exploration("haminton") }}>{">>"}haminton</button>
                </div>}
            </div>
        </div>
    )
}

export default InputDialog;

