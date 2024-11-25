import React from "react";

interface Information_FC {
    headerName?: string,
    type?: string | undefined,
}

// graph information
const graph_information_map = new Map<string | undefined, string>([
    ['mst', "MST is a subgraph connecting all vertices in a weighted graph with the minimum total edge weight and no cycles."],
    ['hamiton', "Hamiltonian cycle in a graph is a closed loop that visits each vertex exactly once, returning to the starting vertex, without repeating edges or vertices."],
    ['dfs', "DFS explores a network graph by traversing as far as possible along each branch before backtracking, using a stack-like structure for vertex exploration"]
])

const Information: React.FC<Information_FC> = function ({ headerName, type }) {


    return (
        <div className="flex flex-col h-auto w-full bg-gray-50 border-b pl-[0.5rem] pb-[0.3rem]">
            <h4 className="font-bold">{headerName ? headerName : "header"}</h4>
            <div>
                <details className="bg-gray-100">
                    <summary className="text-[0.5rem] text-gray-600 hover:bg-gray-200 hover:text-black hover:underline" style={{ gap: "20px" }}>more infor</summary>
                    <p className="text-[0.5rem] shadow-sm shadow-black" style={{ textIndent: "0.4rem" }}>{type ? graph_information_map.get(type) : "this is information about this graph !"}</p>
                </details>
            </div>

        </div>
    )
}

export default Information;