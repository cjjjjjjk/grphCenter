import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { ElementDefinition } from 'cytoscape';

import { useVirsualBox_context } from '../contexts/VirsualBox_contex';

const GraphVisualization: React.FC = () => {
    const { HandleOpenBox, mode, baseNodes, baseLinks } = useVirsualBox_context()
    const mode_data = mode.split('-')

    const cyRef = useRef<HTMLDivElement>(null);
    const [cy, setCy] = useState<cytoscape.Core | null>(null);
    // Reder ===================================
    // base render -----------------------------
    useEffect(() => {
        if (cyRef.current) {
            const cytoscapeInstance = cytoscape({
                container: cyRef.current,

                elements: [],
                style: [
                    {
                        selector: 'node',
                        style: {
                            'content': 'data(id)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'curve-style': 'bezier',
                            // ------------------------------------------------------------ for directed graph !
                            // 'target-arrow-shape': 'triangle',
                            // 'target-arrow-color': '#ddd',
                            'width': 4,
                            'line-color': '#ddd',
                        }
                    },
                    {
                        selector: '.highlighted',
                        style: {
                            'background-color': '#61bffc',
                            'line-color': '#61bffc',
                            'target-arrow-color': '#61bffc',
                            'transition-property': 'background-color, line-color, target-arrow-color',
                            'transition-duration': 500
                        }
                    }
                ]

            });
            const nodes: ElementDefinition[] | undefined = baseNodes?.map((node) => {
                return {
                    group: 'nodes',
                    data: {
                        id: node.id,
                    },
                    position: {
                        x: node.x,
                        y: node.y
                    }
                }
            })
            const links: ElementDefinition[] | undefined = baseLinks?.map((link) => {
                return {
                    group: 'edges',
                    data: {
                        source: link.source.id,
                        target: link.target.id
                    }
                }
            })
            if (nodes) cytoscapeInstance.add(nodes);
            // for start node -------------------------------------- bfs, dfs only.
            if (mode_data.at(1)) cytoscapeInstance.$(`#${mode_data.at(1)}`).style({ 'background-color': '#074799' });
            if (links) cytoscapeInstance.add(links)

            setCy(cytoscapeInstance);
        }
    }, [])
    // ====================================================================================
    // dfs -------------------------------------------------------------------------------
    const dfs = cy?.elements().dfs({
        roots: `#${mode_data.at(1)}`,
        visit: (v, e, u, i, depth) => {
            // need fix order
        },
    });
    let dfs_length = dfs?.path.length;
    var i = 0;
    const RunAnimation_DFS = function () {
        if (i < (dfs_length ? dfs_length : 1)) {
            dfs?.path[i].addClass('highlighted');
            if (dfs?.path[i].data().id === mode_data.at(1)) dfs?.path[i].removeClass('highlighted')
            i++;
            setTimeout(RunAnimation_DFS, 1000);
        }
    };
    // bfs -------------------------------------------------------------------------------
    const SHow_BFSLayout = () => {
        if (cy) cy.layout({
            name: 'breadthfirst',
            roots: [`${mode_data.at(1)}`],
            fit: true,
            animate: true,
            animationDuration: 500,
        }).run();
    };
    const bfs = cy?.elements().bfs({
        root: `#${mode_data.at(1)}`,
        visit: (v, e, u, i, depth) => {
            // need fix order 
        }
    })
    let bfs_length = bfs?.path.length;
    const RunAnimation_BFS = function () {
        if (i < (bfs_length ? bfs_length : 1)) {
            bfs?.path[i].addClass('highlighted');
            if (bfs?.path[i].data().id === mode_data.at(1)) bfs?.path[i].removeClass('highlighted')
            i++;
            setTimeout(RunAnimation_BFS, 1000);
        }
    };

    return (
        <>
            <div className="fixed h-[90%] left-[15rem] top-[3rem] w-[80%] min-w-[48rem] bg-white rounded-lg shadow-lg shadow-gray-500">
                <label htmlFor="" className='absolute top-[1rem] left-[1rem] text-gray-300 text-[1rem] border-l-4 border-gray-300 px-[0.5rem]'>graphCenter - visualization</label>
                <label htmlFor="" className='absolute top-[2.7rem] left-[1rem] text-gray-300 text-[1rem] border-l-4 border-gray-300 px-[0.5rem]'>mode: {mode_data.at(0) + "  "} start: {mode_data.at(1)}</label>
                <button onClick={() => { HandleOpenBox() }}
                    className='absolute w-[6rem] text-start z-50 top-[4.5rem] left-[1rem] px-[0.5rem] py-[0.2rem] bg-slate-200 hover:bg-red-500 border-l-4 border-gray-300 rounded-r-lg  hover:text-white transition-colors duration-300'>• close
                </button>
                <button onClick={() => { SHow_BFSLayout() }} title='show bfs layout'
                    className='absolute w-[6rem] text-start z-50 top-[7rem] left-[1rem] px-[0.5rem] py-[0.2rem] bg-slate-200 hover:bg-green-500 border-l-4 border-gray-300  rounded-r-lg  hover:text-white transition-colors duration-300'>• layout
                </button>
                <button
                    onClick={() => {
                        if (mode_data.at(0) === 'dfs') RunAnimation_DFS();
                        if (mode_data.at(0) === 'bfs') RunAnimation_BFS()
                    }}
                    className='absolute w-[6rem] text-start z-50 top-[9.5rem] left-[1rem] px-[0.5rem] py-[0.2rem] bg-slate-200 hover:bg-blue-500 border-l-4 border-gray-300  rounded-r-lg  hover:text-white transition-colors duration-300'>• start
                </button>


                <div ref={cyRef} className="z-40 h-full w-full" />
            </div>
        </>
    );
};

export default GraphVisualization;
