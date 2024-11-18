import React, { useEffect, useRef, useState } from "react";

// components
import ToolHeader from "../component/ToolHeader";
import InputDialog from "../component/InputDialog";


// entities
import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";
import { redirect } from "react-router-dom";

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
    // element demantion ----------------------
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    const [nodes, setNodes] = useState<CustomNode[]>([]);
    const [links, setLinks] = useState<CustomLink[]>([]);
    const [graphType, setGraphType] = useState("")
    const [data, setData] = useState("")
    const [reDraw, setReDraw] = useState(false)

    // get data from components------------------------
    // graph type : string ----------------
    const handleGraphType = function (graphType: string) {
        setGraphType(graphType)
    }
    // graph data: string, multiple line --
    const graphData = function (data: string) {
        setData(data)
    }
    // redraw graph -------------------
    const ReDraw = function (data: boolean) {
        setReDraw(!reDraw);
    }
    //-------------------------------------------------------
    // render nodes, link from data -------------------------
    // render nodes handle---
    const RenderNode = function () {
        const lines = data.split('\n')
        const [v, e] = lines[0].split(" ").map(Number)

        const nodesfromData = []
        for (let i = 1; i <= v; i++) {
            const node_x: number = Math.floor(Math.random() * (svgDimensions.width) + 10)
            const node_y: number = Math.floor(Math.random() * (svgDimensions.height) + 10);
            const newNode: CustomNode = {
                id: `${i}`,
                name: `${i}`,
                x: (node_x < 10) ? node_x + 40 : ((node_x > (svgDimensions.width - 20)) ? node_x - 50 : node_x),
                y: (node_y < 10) ? node_y + 40 : ((node_y > (svgDimensions.height - 20)) ? node_y - 50 : node_y)
            }
            nodesfromData.push(newNode)
        }
        setNodes(nodesfromData)
    }
    // render link handle ------
    const renderLink = function () {
        const lines = data.split('\n')
        const [v, e] = lines[0].split(" ").map(Number)
        const linksfromData = lines.slice(1).map((line) => {
            const [u, v, w] = line.split(" ").map(Number)
            const startNode = nodes.find(node => node.id === u.toString());
            const endNode = nodes.find(node => node.id === v.toString())

            if (startNode && endNode) {
                const newLink: CustomLink = { source: startNode, target: endNode, weight: w }
                return newLink;
            }
            return undefined

        }).filter((link): link is CustomLink => link !== undefined);
        setLinks(linksfromData)
    }

    // render --------------------------------------
    useEffect(() => {
        const updateSvgDimensions = () => {
            if (svgRef.current) {
                const svg = svgRef.current;
                const width = svg.clientWidth || parseFloat(svg.getAttribute('width') || '0');
                const height = svg.clientHeight || parseFloat(svg.getAttribute('height') || '0');
                setSvgDimensions({ width, height });
            }
        };
        updateSvgDimensions();
        window.addEventListener('resize', updateSvgDimensions);
        return () => {
            window.removeEventListener('resize', updateSvgDimensions);
        };
    }, []);
    useEffect(() => {
        RenderNode()
        console.log(nodes)
    }, [data, reDraw])
    useEffect(() => {
        renderLink();
    }, [nodes])
    // -----------------------------------------------------


    return (
        <>
            <ToolHeader graphType={handleGraphType} />
            <div className="flex bottom-0 w-full h-[1235px]">
                {graphType && <InputDialog graphType={graphType} className="slide-in" dataHandler={graphData} ReDraw={ReDraw} />}
                {/* <div className="top-0 h-auto">
                    <button onClick={addNode} className="m-2 p-2 bg-blue-500 text-white">Add Node</button>
                    <button onClick={() => addLink("1", "2")} className="m-2 p-2 bg-green-500 text-white">Add Link</button>
                </div> */}
                <div className="h-full w-full px-1 py-1 border-x-2 border-y-2 ">
                    <svg ref={svgRef} className="w-full top-0 h-full bg-gray-200">
                        {/* Links */}
                        {links.map((link, index) => {
                            const midX = (link.source.x + link.target.x) / 2
                            const midY = (link.source.y + link.target.y) / 2
                            return (<g key={`link-${index}`}>
                                <line
                                    x1={link.source.x}
                                    y1={link.source.y}
                                    x2={link.target.x}
                                    y2={link.target.y}
                                    strokeWidth={2}
                                    stroke="#999"
                                    strokeOpacity={0.6}
                                    strokeDasharray={link.dashed ? '8,4' : undefined}
                                />
                                <text
                                    x={midX}
                                    y={midY}
                                    fill="black"
                                    fontSize="16"
                                    fontWeight='bold'
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {link.weight || ""} {/* Hiển thị trọng số w */}
                                </text>
                            </g>)
                        }
                        )}
                        {/* Nodes */}
                        {nodes.map((node, index) => (
                            <g key={`node-${index}`}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={20}
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
                                    {node.id}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div >
        </>
    );
};

export default Calculator;
