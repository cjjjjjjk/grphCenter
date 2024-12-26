import React from "react";

interface Information_FC {
    headerName?: string,
    type?: string | undefined,
}

// graph information
const graph_information_map = new Map<string | undefined, { des: string, link: string }>([
    ['sp', { des: "In graph theory, the shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the weights of its constituent edges is minimized.", link: "https://en.wikipedia.org/wiki/Shortest_path_problem" }],
    ['mst', { des: "MST is a subgraph connecting all vertices in a weighted graph with the minimum total edge weight and no cycles.", link: "https://en.wikipedia.org/wiki/Minimum_spanning_tree" }],
    ['hamilton', { des: "Hamiltonian cycle in a graph is a closed loop that visits each vertex exactly once, returning to the starting vertex, without repeating edges or vertices.", link: "https://en.wikipedia.org/wiki/Hamiltonian_path" }],
    ['dfs', { des: "DFS explores a network graph by traversing as far as possible along each branch before backtracking, using a stack-like structure for vertex exploration.", link: "https://en.wikipedia.org/wiki/Depth-first_search" }],
    ['bfs', { des: "BFS is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level. ", link: "https://en.wikipedia.org/wiki/Breadth-first_search" }]
])

const Information: React.FC<Information_FC> = function ({ headerName, type }) {
    return (
        <div className="flex flex-col h-auto w-full bg-gray-50 border-b pl-[0.5rem] pb-[0.3rem]">
            <h4 className="font-bold">{headerName ? headerName : "header"}</h4>
            <div>
                <details className="bg-gray-100" open>
                    <summary className="text-[0.5rem] text-gray-600 hover:bg-gray-200 hover:text-black hover:underline" style={{ gap: "20px" }}>more infor</summary>
                    <p className="text-[0.5rem] shadow-sm shadow-black" style={{ textIndent: "0.4rem" }}>{type ? graph_information_map.get(type)?.des : "this is information about this graph !"}
                        <a rel="stylesheet" className="w-full h-[1rem] text-blue-400 hover:underline hover:text-blue-900" href={graph_information_map.get(type)?.link}>{type ? `wiki-${type}` : "wiki"}</a>
                    </p>
                </details>
            </div>

        </div>
    )
}

export default Information;