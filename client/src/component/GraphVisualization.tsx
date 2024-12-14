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
                        selector: '.head',
                        style: {
                            "background-color": '#D91656'
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
            if (mode_data.at(1)) cytoscapeInstance.$(`#${mode_data.at(1)}`).style({ 'background-color': 'red' });
            if (links) cytoscapeInstance.add(links)

            setCy(cytoscapeInstance);
        }
    }, [])
    // =========================================
    // dfs -----------------------------
    let dfs = cy?.elements().dfs({
        roots: `#${mode_data.at(1)}`,
        visit: (v, e, u, i, depth) => { },
    });
    let length = dfs?.path.length;
    var i = 0;
    var RunAnimation_DFS = function () {
        if (i < (length ? length : 1)) {
            dfs?.path[i].addClass('highlighted');
            i++;
            setTimeout(RunAnimation_DFS, 1000);
        }
    };

    return (
        <>
            <div className="fixed h-[90%] left-[15rem] top-[3rem] w-[80%] min-w-[48rem] bg-white rounded-lg shadow-lg shadow-gray-500">
                <label htmlFor="" className='absolute top-[1rem] left-[1rem] text-gray-300 text-[1rem] border-l-4 border-gray-300 px-[0.5rem]'>graphCenter - visualization</label>
                <label htmlFor="" className='absolute top-[2.7rem] left-[1rem] text-gray-300 text-[1rem] border-l-4 border-gray-300 px-[0.5rem]'>mode: {mode_data.at(0) + "  "} start: {mode_data.at(1)}</label>
                <button onClick={() => { HandleOpenBox() }}
                    className='absolute z-50 top-[4.5rem] left-[1rem] px-[0.5rem] py-[0.2rem] bg-slate-200 hover:bg-red-500 border-l-4 border-gray-300 rounded-r-lg  hover:text-white transition-colors duration-300'>• close
                </button>
                <button onClick={() => { RunAnimation_DFS(); }}
                    className='absolute z-50 top-[7rem] left-[1rem] px-[0.5rem] py-[0.2rem] bg-slate-200 hover:bg-blue-500 border-l-4 border-gray-300  rounded-r-lg  hover:text-white transition-colors duration-300'>• start
                </button>


                <div ref={cyRef} className="z-40 h-full w-full" />
            </div>
        </>
    );
};

export default GraphVisualization;
