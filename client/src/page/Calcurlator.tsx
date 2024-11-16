import React from "react";
import { DefaultNode, Graph } from '@visx/network';


// components
import ToolHeader from "../component/ToolHeader";


interface CustomNode {
    x: number;
    y: number;
    color?: string;
}

interface CustomLink {
    source: CustomNode;
    target: CustomNode;
    weight?: number;
    dashed?: boolean;
}


const nodes: CustomNode[] = [
    { x: 50, y: 20 },
    { x: 200, y: 250 },
    { x: 300, y: 40, color: '#26deb0' },
];

const links: CustomLink[] = [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[1], target: nodes[2] },
    { source: nodes[2], target: nodes[0], dashed: true },
];

const graph = {
    nodes,
    links,
};

const Calculator: React.FC = () => {
    return (
        <>
            <ToolHeader />
            <div className="bottom-0 w-full h-[1235px]">
                <svg className="w-full h-full  bg-calcurlator-color-custom">
                    <Graph<CustomLink, CustomNode>
                        graph={graph}
                        top={0}
                        left={0}

                        nodeComponent={({ node: { color } }) =>
                            color ? <DefaultNode fill={color} /> : <DefaultNode />
                        }
                        linkComponent={({ link: { source, target, dashed } }) => (
                            <line
                                x1={source.x}
                                y1={source.y}
                                x2={target.x}
                                y2={target.y}
                                strokeWidth={2}
                                stroke="#999"
                                strokeOpacity={0.6}
                                strokeDasharray={dashed ? '8,4' : undefined}
                            />
                        )}
                    /> Home
                </svg>
            </div >
        </>
    )
}

export default Calculator