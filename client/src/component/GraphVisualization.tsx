import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

import { useVirsualBox_context } from '../contexts/VirsualBox_contex';

const GraphVisualization: React.FC = () => {

    // BoxHandling =============
    const { HandleOpenBox } = useVirsualBox_context()

    const cyRef = useRef<HTMLDivElement>(null);
    const [cy, setCy] = useState<cytoscape.Core | null>(null);

    useEffect(() => {
        if (cyRef.current) {
            const cytoscapeInstance = cytoscape({
                container: cyRef.current,
                elements: [
                    { data: { id: 'a' } },
                    { data: { id: 'b' } },
                    { data: { id: 'c' } },
                    { data: { source: 'a', target: 'b' } },
                    { data: { source: 'b', target: 'c' } },
                ],
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#0074D9',
                            label: 'data(id)',
                        },
                    },
                    {
                        selector: 'edge',
                        style: {
                            'line-color': '#FF4136',
                            'target-arrow-color': '#FF4136',
                            'target-arrow-shape': 'triangle',
                            width: 2,
                        },
                    },
                ],
                layout: {
                    name: 'grid',
                    rows: 1,
                },
            });

            return () => cytoscapeInstance.destroy();
        }
    }, []);


    return (
        <>
            <div className="fixed h-[90%] left-[15rem] top-[5rem] w-[80%] min-w-[50rem] bg-white rounded-lg shadow-lg shadow-gray-500">
                <label htmlFor="" className='absolute top-[1rem] left-[1rem] text-gray-300 text-[1rem] border-l-4 border-gray-300 px-[0.5rem]'>graphCenter - visualization</label>
                <button onClick={HandleOpenBox}
                    className='absolute z-50 top-[1rem] right-[1rem] px-[0.5rem] py-[0.2rem] bg-amber-200 hover:bg-red-500 rounded-lg  hover:text-white transition-colors duration-300'>• close</button>


                <div ref={cyRef} className="z-40 h-full w-full" />
            </div>
        </>
    );
};

export default GraphVisualization;
