import React, { useState } from "react";

interface ComponentInputProps {
    graphType: string,
    className: string,
    dataHandler: (data: string) => void,
    NumberOfNode: (data: string) => void,
    ReDraw: (data: boolean) => void
}

const InputDialog: React.FC<ComponentInputProps> = function ({ graphType, className, dataHandler, ReDraw, NumberOfNode }) {
    const [data, setData] = useState("")
    const [isDrawed, seIsDrawed] = useState(false)
    const [numberOfNode, setNumberOfNodes] = useState("")

    return (
        <div className={`${className} stop-0 left-0 w-[20rem] h-screen pr-[0.5rem] shadow-sm shadow-black`}>
            <div className="pt-[2.5rem] pl-[1rem] overflow-hidden">
                <h3 className="mt-[0.5rem] text-[0.75rem]">import: {graphType} graph</h3>
                <hr className="mb-4" />
                <input
                    className="w-full h-[1.5rem] rounded focus:outline-none mb-2 border text-[0.75rem] pl-[0.5rem]" type="text" placeholder="number of nodes"
                    onChange={(e) => { setNumberOfNodes(e.target.value) }} />
                <textarea
                    className="border rounded w-full h-[20rem] p-2 mb-4 font-mono text-sm focus:outline-none text-[0.75rem]"
                    placeholder="each line for an edge &#10;(v1 v2 w) &#10;example:&#10;1 2 1&#10;1 3 4&#10;1 5 1&#10;2 4 2&#10;2 5 1&#10;3 4 3&#10;3 5 3&#10;4 5 2"
                    style={{ whiteSpace: 'pre-wrap' }}
                    onChange={(e) => { setData(e.target.value) }}
                ></textarea>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            dataHandler(data)
                            NumberOfNode(numberOfNode)
                            if (isDrawed && data) ReDraw(true);
                            if (data) seIsDrawed(true);
                        }}
                        className="px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-500"
                    >
                        {isDrawed && data ? "draw again" : "draw"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputDialog;

