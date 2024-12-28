import React, { useState, useRef, useEffect } from "react";

// components
import Information from "./Information";

// effects
import { useRippleEffect } from "../effect/ripple";
import { useVirsualBox_context } from "../contexts/VirsualBox_contex";
interface ComponentInputProps {
    graphType: string,
    className: string,
    dataHandler: (data: string) => void,
    NumberOfNode: (data: string) => void,
    ReDraw: (data: boolean) => void
    Exploration: (algorithm: string) => void,
    MST: number,
    HAMITON: boolean,
    SetNodeStart: (nodeStart: string) => void,
    SetSP_Node: (sp_nodes: string) => void,
    DFS_Start?: string,
    DFS_Path?: string[],
    BFS_Start?: string,
    BFS_Path?: string[],
}


const InputDialog: React.FC<ComponentInputProps> = function ({ graphType, className, dataHandler, ReDraw, NumberOfNode, Exploration, MST, HAMITON, SetNodeStart, DFS_Start, DFS_Path, BFS_Start, BFS_Path, SetSP_Node }) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [isDrawed, setIsDrawed] = useState(false)
    const [data, setData] = useState("1 4\n2 5\n6 1\n4 5\n2 7\n3 4\n3 5\n6 8\n8 5")
    const [numberOfNode, setNumberOfNodes] = useState("8")
    const [numberofNode_submited, setNumberofNode_submited] = useState<number>(8)
    const [exploration, setExploration] = useState<string>("")
    const [nodeSelect, setNodeSeclect] = useState<string | null>(null)
    // shortest path
    const [spNodestart, setspNodestart] = useState<string>("1")
    const [spNodeEnd, setspNodeEnd] = useState<string>("8")

    useEffect(() => {
        SetSP_Node(spNodestart + "-" + spNodeEnd)
    }, [spNodeEnd, spNodestart])

    // effects 
    const addrippleEffect = useRippleEffect()
    // clear textarea button
    const ClearTextArea = function () {
        if (textAreaRef.current) {
            textAreaRef.current.value = "";
            setData("")
        }
    }

    // handlers ---------------------
    const handleRedraw = () => {
        HandleOpenBox(false)
        dataHandler(data);
        NumberOfNode(numberOfNode);
        setNumberofNode_submited(Number(numberOfNode))
        if (isDrawed && data) ReDraw(true);
        if (data) setIsDrawed(true);
    };

    useEffect(() => {
        if (exploration !== "dfs" && exploration !== "bfs") setNodeSeclect(null)
    }, [exploration])

    // VirsualBox context ==============
    const { HandleOpenBox, SetMode } = useVirsualBox_context();
    return (
        <div className={`${className} stop-0 left-0 max-w-[13rem] h-screen pr-[0.5rem] shadow-sm shadow-black text-black`}>
            <div className="pt-[2.5rem] pl-[0.75rem] overflow-hidden">
                <h3 className="mt-[0.5rem] text-[0.75rem]">import: {graphType} graph</h3>
                <hr className="mb-4" />
                <input
                    className="w-full h-[1.5rem] focus:outline-none mb-2 border border-black text-[0.75rem] pl-[0.5rem]" type="text" placeholder="number of nodes" autoFocus
                    onChange={(e) => { setNumberOfNodes(e.target.value); setspNodeEnd(e.target.value) }}
                    defaultValue={numberOfNode} />
                <textarea ref={textAreaRef}
                    className={`border border-black w-full p-2 focus:outline-none text-[0.75rem] ${isDrawed && data ? "h-[6rem]" : "h-[18rem]"} transition-[width,height] duration-400`}
                    placeholder="each line for an edge &#10;(v1 v2 w) &#10;example:&#10;1 2 1&#10;1 3 4&#10;1 5 1&#10;2 4 2&#10;2 5 1&#10;3 4 3&#10;3 5 3&#10;4 5 2"
                    style={{
                        whiteSpace: 'pre-wrap',
                    }}
                    defaultValue={data}
                    onChange={(e) => { setData(e.target.value) }}
                ></textarea>
                <div className="flex justify-end">
                    {(isDrawed && data) && <button
                        className="relative overflow-hidden mr-4 px-4 text-[0.75rem] py-1 font-bold bg-white text-black border border-black hover:border-white transition-all rounded-full hover:bg-red-600 hover:text-white whitespace-nowrap duration-500"
                        onClick={(e) => {
                            setIsDrawed(false)
                            addrippleEffect(e);
                            ClearTextArea()
                        }}>clear</button>}
                    <button
                        className={`relative overflow-hidden px-4 text-[0.75rem] py-1 font-bold bg-white text-black border border-black hover:border-white transition-all rounded-full hover:bg-black hover:text-white whitespace-nowrap duration-500`}
                        onClick={(e) => {
                            addrippleEffect(e)
                            setExploration("")
                            Exploration("")
                            handleRedraw();
                            ReDraw(true);
                            if (data) setIsDrawed(true);
                        }}>
                        {isDrawed && data ? "draw again" : "draw"}
                    </button>
                </div>
                {(isDrawed && data) && <div className="flex flex-col items-start text-[0.75rem] mt-[1rem]">
                    <div className="flex mb-[0.2rem]"><h3><u>graph exploration</u></h3><button className="ml-[1rem] bg-black hover:bg-green-600 rounded-full w-[1.2rem] text-white text-center hover:cursor-pointer">?</button></div>
                    {/* Shortest path  */}
                    <div className="flex w-full">
                        <button
                            className={`w-[60%] text-left transition-color duration-100  whitespace-nowrap ${exploration === "sp" ? " bg-black text-white" : "hover:text-[#003161] hover:underline"}`}
                            onClick={() => {
                                HandleOpenBox(false)
                                if (exploration === "sp") {
                                    setExploration("none");
                                    Exploration("none")
                                } else {
                                    setExploration("sp");
                                    Exploration("sp");
                                }
                            }}>{">>"}shortest path
                        </button>
                        {exploration === "sp" && <>
                            <button className={`w-[19%] ml-[1%] bg-blue-800  text-white hover:bg-red-500 hover:text-white text-center`}
                                onClick={() => {
                                    if (nodeSelect === null)
                                        setNodeSeclect("sp-start")
                                    else setNodeSeclect(null)
                                }}>{spNodestart}</button>
                            <button className={`w-[19%] ml-[1%] bg-blue-800 rounded-r-sm text-white hover:bg-red-500 hover:text-white text-center`}
                                onClick={() => {
                                    if (nodeSelect === null)
                                        setNodeSeclect("sp-end")
                                    else setNodeSeclect(null)
                                }}>{spNodeEnd}</button>
                        </>}
                    </div>

                    {exploration === "sp" && <Information headerName="shortest path problem" type="sp" />}

                    {/*MST*/}
                    <button
                        className={`w-full text-left transition-color duration-100  whitespace-nowrap ${exploration === "mst" ? " bg-black text-white" : "hover:text-[#003161] hover:underline"}`}
                        onClick={() => {
                            HandleOpenBox(false)
                            if (exploration === "mst") {
                                setExploration("none");
                                Exploration("none")
                            } else {
                                setExploration("mst");
                                Exploration("mst");
                            }
                        }}>{">>"}mst
                        {exploration === "mst" && <span className={`ml-[6rem] !no-underline`}>MST: {isNaN(MST) ? 0 : MST}</span>}</button>
                    {exploration === "mst" && <Information headerName="minimum spanning tree" type="mst" />}

                    <button
                        className={`w-full text-left transition-color duration-100  whitespace-nowrap ${exploration === "hamiton" ? "bg-black text-white" : "hover:text-[#003161] hover:underline"}`}
                        onClick={() => {
                            HandleOpenBox(false)
                            if (exploration === "hamiton") {
                                setExploration("none");
                                Exploration("none")
                            } else {
                                setExploration("hamiton");
                                Exploration("hamiton")
                            }
                        }}>{">>"}hamilton
                        {exploration === "hamiton" && <span className={`ml-[4.5rem] font-bold ${HAMITON ? "text-blue-400" : "text-red-400"}`}>{HAMITON ? "true" : "false"}</span>}</button>
                    {exploration === "hamiton" && <Information headerName="hamiltonian graph" type="hamilton" />}
                    <div className="flex w-full">
                        <button
                            className={`flex justify-between items-center whitespace-nowrap ${exploration === "dfs" ? "w-[80%] bg-black text-white" : "w-full hover:text-[#003161] hover:underline"}`}
                            onClick={() => {
                                HandleOpenBox(false)
                                if (exploration === "dfs") {
                                    setExploration("none");
                                    Exploration("none")
                                } else {
                                    setExploration("dfs");
                                    Exploration("dfs")
                                }
                            }}>{">>"}dfs
                            {exploration === "dfs" && <span className={`text-[0.5rem] text-right transition-none mr-1`}>starting vertex:</span>}</button>
                        {exploration === "dfs" &&
                            <button className={`w-[19%] ml-[1%] bg-blue-800 rounded-sm text-white hover:bg-red-500 hover:text-white text-center`}
                                onClick={() => {
                                    if (nodeSelect === null)
                                        setNodeSeclect("dfs")
                                    else setNodeSeclect(null)
                                }}>{DFS_Start}</button>}
                    </div>
                    {exploration === "dfs" && (
                        <>
                            <div className="flex flex-col w-full">
                                <Information headerName="depth first search" type="dfs" />
                                <div className="w-full max-w-full overflow-x-auto flex flex-row items-center justify-between px-[2%] bg-gray-200 py-[0.1rem] border-y-2 border-black">
                                    {DFS_Path?.map((node) => {
                                        return (
                                            <span className="bg-blue-800 px-1 ml-[0.25rem] rounded-sm text-white">{`${node}`}</span>
                                        );
                                    })}
                                </div>
                            </div>
                            <button onClick={() => { HandleOpenBox(); SetMode(`dfs-${DFS_Start}`) }}
                                className="w-full h-[1.5rem] pl-[0.5rem] text-[#0A5EB0] rounded-lg hover:text-white my-[0.2rem] text-start font-bold hover:bg-[#0A5EB0] transition-colors duration-300">• animated dfs 🫏</button>
                        </>
                    )}
                    <div className="flex w-full">
                        <button
                            className={`flex justify-between items-center whitespace-nowrap ${exploration === "bfs" ? "w-[80%] bg-black text-white" : "w-full hover:text-[#003161] hover:underline"}`}
                            onClick={() => {
                                HandleOpenBox(false)
                                if (exploration === "bfs") {
                                    setExploration("none");
                                    Exploration("none")
                                } else {
                                    setExploration("bfs");
                                    Exploration("bfs")
                                }
                            }}>{">>"}bfs
                            {exploration === "bfs" && <span className={`text-[0.5rem] text-right transition-none mr-1`}>starting vertex:</span>}</button>
                        {exploration === "bfs" &&
                            <button className={`w-[19%] ml-[1%] bg-blue-800 rounded-sm text-white hover:bg-red-500 hover:text-white text-center`}
                                onClick={() => {
                                    if (nodeSelect === null)
                                        setNodeSeclect("bfs")
                                    else setNodeSeclect(null)
                                }}>{BFS_Start}</button>}
                    </div>
                    {exploration === "bfs" && (
                        <>
                            <div className="flex flex-col w-full">
                                <Information headerName="breadth first search" type="bfs" />
                                <div className="w-full max-w-full overflow-x-auto flex flex-row items-center justify-between px-[2%] bg-gray-200 py-[0.1rem] border-y-2 border-black">
                                    {BFS_Path?.map((node) => {
                                        return (
                                            <span className="bg-blue-800 px-1 ml-[0.25rem] rounded-sm text-white">{`${node}`}</span>
                                        );
                                    })}
                                </div>
                            </div>
                            <button onClick={() => { HandleOpenBox(); SetMode(`bfs-${BFS_Start}`) }}
                                className="w-full h-[1.5rem] pl-[0.5rem] text-[#0A5EB0] rounded-lg hover:text-white my-[0.2rem] text-start font-bold hover:bg-[#0A5EB0] transition-colors duration-300">• animated bfs 🫏</button>
                        </>)}
                </div>}
            </div>

            {/* Nodes select box */}
            {
                (nodeSelect !== null) && (exploration === "dfs" || exploration === "bfs" || exploration === "sp")
                && <div className={`fixed flex flex-col overflow-auto overflow-x-hidden justify-between py-[0.4rem] left-[13.5rem] h-[35%] border border-l-black w-[2.2rem] transform -translate-x-1/2 -translate-y-1/2 rounded-r-md bg-white shadow-sm  shadow-black`}>
                    {Array.from({ length: numberofNode_submited }, (_, i) => (
                        <div key={`${i + 1}`} className={`h-[1.5rem] w-full text-[1rem] pl-[0.3rem] hover:bg-black hover:text-white flex items-center ${(i + 1) === Number(exploration == "dfs" ? DFS_Start : BFS_Start) ? "bg-gray-300" : "bg-white cursor-pointer"}`}
                            onClick={() => {
                                HandleOpenBox(false)
                                if (exploration === "sp") {
                                    if (nodeSelect === "sp-start") setspNodestart(String(i + 1));
                                    if (nodeSelect === "sp-end") setspNodeEnd(String(i + 1));
                                } else {
                                    SetNodeStart(String(i + 1));
                                }
                                setNodeSeclect(null)
                            }}>{i + 1}</div>
                    ))}
                </div>
            }
        </div >
    )
}

export default InputDialog;

