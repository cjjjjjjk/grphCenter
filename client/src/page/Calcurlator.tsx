import React, { useState } from "react";

// components
import ToolHeader from "../component/ToolHeader";


// entities
import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

// test data --------------------------------------------------
const nodes_test =
    [
        { id: "1", x: 500, y: 40, name: "1" },
        { id: "2", x: 200, y: 250, name: "2" },
        { id: "3", x: 300, y: 40, name: "3", color: '#26deb0' },
        { id: "4", x: 1200, y: 800, name: "4", color: '#26deb0' },

    ]
const links_test = [
    { source: nodes_test[0], target: nodes_test[1] },
    { source: nodes_test[1], target: nodes_test[2] },
    { source: nodes_test[2], target: nodes_test[0], dashed: true },
    { source: nodes_test[3], target: nodes_test[0], dashed: true },

]
// ------------------------------------------------------------
// Main component =============================================
const Calculator: React.FC = () => {
    const [nodes, setNodes] = useState<CustomNode[]>(nodes_test);
    const [links, setLinks] = useState<CustomLink[]>(links_test);


    const addNode = () => {
        const newNode: CustomNode = {
            id: `${nodes.length + 1}`,
            name: `${nodes.length + 1}`,
            x: Math.random() * 2400 + 50,
            y: Math.random() * 1400,
            color: "steelblue",
        };
        setNodes([...nodes, newNode]);
    };

    const addLink = (sourceId: string, targetId: string) => {
        const sourceNode = nodes.find(node => node.id === sourceId);
        const targetNode = nodes.find(node => node.id === targetId);

        if (sourceNode && targetNode) {
            const newLink: CustomLink = { source: sourceNode, target: targetNode };
            setLinks([...links, newLink]);
        }
    };

    return (
        <>
            <ToolHeader />
            <div className="bottom-0 w-full h-[1235px]">
                <div className="top-0 h-auto">
                    <button onClick={addNode} className="m-2 p-2 bg-blue-500 text-white">Add Node</button>
                    <button onClick={() => addLink("1", "2")} className="m-2 p-2 bg-green-500 text-white">Add Link</button>
                </div>
                <svg className="w-full top-0 h-full bg-calcurlator-color-custom">
                    {/* Links */}
                    {links.map((link, index) => (
                        <line
                            key={`link-${index}`}
                            x1={link.source.x}
                            y1={link.source.y}
                            x2={link.target.x}
                            y2={link.target.y}
                            strokeWidth={2}
                            stroke="#999"
                            strokeOpacity={0.6}
                            strokeDasharray={link.dashed ? '8,4' : undefined}
                        />
                    ))}
                    {/* Nodes */}
                    {nodes.map((node, index) => (
                        <g key={`node-${index}`}>
                            <circle
                                cx={node.x}
                                cy={node.y}
                                r={22}
                                fill={node.color || "steelblue"}
                            />
                            <text
                                x={node.x}
                                y={node.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={16}
                                fontWeight='bold'
                                fill="white"
                            >
                                {node.name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </>
    );
};

export default Calculator;
