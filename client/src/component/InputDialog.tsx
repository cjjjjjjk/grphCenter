import React, { useState } from "react";

interface ComponentInputProps {
    graphType: string,
    className: string
}

const InputDialog: React.FC<ComponentInputProps> = function ({ graphType, className }) {

    return (

        <div className={`${className} left-0 bg-white border-neutral-600 shadow-lg p-4 w-96 `}>
            <h3 className="font-bold text-lg mb-2">import : {graphType} graph</h3>
            <textarea
                value={""}
                // onChange={}
                placeholder="Enter your data (multiple lines supported)"
                className="border border-neutral-400 rounded w-full h-3/5 p-2 mb-4 font-mono text-sm focus:border-neutral-400 focus:outline-none"
            ></textarea>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => (false)}
                    className="px-4 py-2 text-sm border border-neutral-400 rounded hover:bg-neutral-200"
                >
                    cancel
                </button>
                <button
                    // onClick={ }
                    className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    import
                </button>
            </div>
        </div>
    )
}

export default InputDialog;

