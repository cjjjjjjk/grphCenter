import { tree } from "d3";
import React, { useState } from "react";
import { redirect } from "react-router-dom";

interface ComponentInputProps {
    graphType: string,
    className: string,
    dataHandler: (data: string) => void,
    ReDraw: (data: boolean) => void
}

const InputDialog: React.FC<ComponentInputProps> = function ({ graphType, className, dataHandler, ReDraw }) {
    const [data, setData] = useState("")
    const [isDrawed, seIsDrawed] = useState(false)


    return (
        <div className={`${className} left-0 bg-white border-neutral-300 shadow-lg p-4 w-96 border-r-2`}>
            <h3 className="font-bold text-lg mb-2">import : {graphType} graph</h3>
            <textarea
                placeholder="v e  &#10;e lines for each edge (v1 v2 w) &#10;example: &#10;5 8&#10;1 2 1&#10;1 3 4&#10;1 5 1&#10;2 4 2&#10;2 5 1&#10;3 4 3&#10;3 5 3&#10;4 5 2"
                className="border border-neutral-400 rounded w-full h-3/5 p-2 mb-4 font-mono text-sm focus:border-neutral-400 focus:outline-none"
                style={{ whiteSpace: 'pre-wrap' }}
                onChange={(e) => { setData(e.target.value) }}
            ></textarea>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        dataHandler(data)
                        if (isDrawed && data) ReDraw(true);
                        if (data) seIsDrawed(true);
                    }}
                    className="px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-500"
                >
                    {isDrawed && data ? "draw again" : "draw"}
                </button>
            </div>
        </div>
    )
}

export default InputDialog;

