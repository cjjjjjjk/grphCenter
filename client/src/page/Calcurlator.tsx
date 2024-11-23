import React, { useEffect, useRef, useState } from "react";

// components
import ToolHeader from "../component/ToolHeader";
import InputDialog from "../component/InputDialog";


// entities
import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

// algothirisms
import { KruskalReturnNewNodesandLinks } from "../algothrism/kruskal";
// ------------------------------------------------------------
// Main component =============================================
const Calculator: React.FC = () => {
    // element demantion ----------------------
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [svgDimensions, setSvgDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    // state ----------------------------------
    const [base_nodes, setBaseNodes] = useState<CustomNode[]>([])
    const [base_links, setBaseLinks] = useState<CustomLink[]>([])
    const [nodes, setNodes] = useState<CustomNode[]>([]);
    const [links, setLinks] = useState<CustomLink[]>([]);
    const [graphType, setGraphType] = useState<string>("")
    const [data, setData] = useState<string>("")
    const [numberofNodes, setNumberOfNodes] = useState<number>(NaN)
    const [nodeRadious, setNodeRadious] = useState<number>(15)
    const [reDraw, setReDraw] = useState<boolean>(false)
    const [exploration, setExploration] = useState<string>("")

    const [rs_MST, setRs_MST] = useState<number>(NaN)
    // get data from components-------------------------------
    // graph type : string ----------------
    const handleGraphType = function (graphType: string) {
        setGraphType(graphType)
    }
    // get graph exploration : hamiton, mst, dfs, bfs, ...
    const GetExploration = function (exploration_input: string) {
        setExploration(exploration_input)
    }
    // graph data: string, multiple line --
    const graphData = function (data: string) {
        setData(data)
    }
    const NumberOfNode = function (data: string) {
        const parsedNumber = Number(data);

        if (!isNaN(parsedNumber) && Number.isInteger(parsedNumber) && parsedNumber > 0) {
            setNumberOfNodes(parsedNumber);
        } else {
            console.error("Invalid input: Please provide a valid positive integer.");
        }
    };
    // redraw graph -------------------
    const ReDraw = function (data: boolean) {
        setReDraw(!reDraw);
    }
    //-------------------------------------------------------
    // render nodes, link from data -------------------------
    const CreateNodePosition = function () {
        const svgCenter = {
            x: Math.floor(svgDimensions.width / 2),
            y: Math.floor(svgDimensions.height / 2),
        };
        const sigmaX = (svgDimensions.width - 50) / 4;
        const sigmaY = (svgDimensions.height - 50) / 4;

        const randomGaussian = () => {
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        };
        const x = Math.min(
            Math.max(svgCenter.x + sigmaX * randomGaussian(), 25),
            svgDimensions.width - 25
        );
        const y = Math.min(
            Math.max(svgCenter.y + sigmaY * randomGaussian(), 25),
            svgDimensions.height - 25
        );

        return { x, y }
    }
    // render --------------------------------------
    useEffect(() => {
        const svgElement = svgRef.current;
        if (!svgElement) return;

        const updateSize = () => {
            setSvgDimensions({
                width: svgElement.clientWidth,
                height: svgElement.clientHeight,
            });
        };

        const resizeObserver = new ResizeObserver(() => { updateSize(); });

        resizeObserver.observe(svgElement);
        updateSize();
        return () => { resizeObserver.disconnect(); };
    }, []);
    // render basic graph 
    useEffect(() => {
        // render nodes: declare node's properties ---
        const nodesfromData: CustomNode[] = []
        for (let i = 1; i <= numberofNodes; i++) {
            let validPosition = false;
            let x = 0, y = 0;
            while (!validPosition) {
                ({ x, y } = CreateNodePosition());
                validPosition = nodesfromData.every(
                    (storedNode) =>
                        Math.sqrt((storedNode.x - x) ** 2 + (storedNode.y - y) ** 2) >= nodeRadious * 4
                );
            }
            const newNode: CustomNode = {
                id: `${i}`,
                name: `${i}`,
                flag: false,
                x, y,
            };
            nodesfromData.push(newNode);
        }
        // declare link's properties -----------------
        const lines = data.split('\n')
        if (!lines) return;
        const linksfromData = lines.slice().map((line) => {
            if (line.trim()) {
                const [u, v, w] = line.split(" ").map(Number)
                const startNode = nodesfromData.find(node => node.id === u.toString());
                const endNode = nodesfromData.find(node => node.id === v.toString());
                if (!startNode || !endNode) return undefined;
                if (startNode && endNode) {
                    const newLink: CustomLink = { source: startNode, target: endNode, weight: w, flag: false }
                    return newLink;
                }
            }
            return undefined
        }).filter((link): link is CustomLink => link !== undefined);
        setBaseNodes(nodesfromData)
        setBaseLinks(linksfromData)
        setNodes(nodesfromData);
        setLinks(linksfromData)
    }, // recall when: newdata, redraw , change svg size 
        [data, reDraw, svgDimensions])
    // update radious 
    useEffect(() => {
        if (numberofNodes <= 10) setNodeRadious(18)
        else if (numberofNodes <= 20) setNodeRadious(15);
        else if (numberofNodes <= 50) setNodeRadious(10);
        else setNodeRadious(5)
    }, [numberofNodes])
    // -----------------------------------------------------

    // Update Graph with algthrism ----------------------
    useEffect(() => {
        var ResultGraph: { nodes: CustomNode[], links: CustomLink[], MST?: number }
        if (exploration == "mst") {
            ResultGraph = KruskalReturnNewNodesandLinks(nodes, links)
            setRs_MST(ResultGraph.MST ? ResultGraph.MST : NaN)
        }
        else if (exploration == "hamiton") {
            ResultGraph = { nodes: base_nodes, links: base_links }
        }
        else {
            ResultGraph = { nodes: base_nodes, links: base_links }
        }
        setNodes((prevNodes) => {
            return prevNodes.map((node) => {
                const updatedNode = ResultGraph.nodes.find(newNode => newNode.id === node.id);
                if (updatedNode) {
                    return { ...node, ...updatedNode };
                }
                return node;
            });
        });
        setLinks((prevLinks) => {
            return prevLinks.map((link) => {
                const updatedLink = ResultGraph.links.find(newLink =>
                    newLink.source.id === link.source.id && newLink.target.id === link.target.id);
                if (updatedLink) {
                    return { ...link, ...updatedLink };
                }
                return link;
            });
        });
    }, [exploration])

    return (
        <>
            <ToolHeader graphType={handleGraphType} />
            <div className="flex bottom-0 w-full h-screen">
                {graphType && <InputDialog graphType={graphType} className="slide-in" dataHandler={graphData} ReDraw={ReDraw} NumberOfNode={NumberOfNode} Exploration={GetExploration} MST={rs_MST} />}
                <div className="flex items-center justify-center w-full border border-black bg-color-custom">
                    <svg ref={svgRef} className="w-[95%] h-5/6 bg-gray-200 shadow-sm shadow-black">
                        {/* Links */}
                        {links.map((link, index) => {
                            const midX = (link.source.x + link.target.x) / 2
                            const midY = (link.source.y + link.target.y) / 2
                            return (<g key={`link-${index} `} >
                                <line className="transition-colors duration-1000"
                                    x1={link.source.x}
                                    y1={link.source.y}
                                    x2={link.target.x}
                                    y2={link.target.y}
                                    strokeWidth={link.flag ? nodeRadious / 6 : 1}
                                    stroke={link.flag ? "black" : "#A6AEBF"}
                                    strokeOpacity={1}
                                />
                                <text
                                    x={midX}
                                    y={midY}
                                    fill={link.flag ? "red" : "#A6AEBF"}
                                    fontSize={nodeRadious}
                                    fontWeight={link.flag ? "bold" : "1"}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {link.weight || ""}
                                </text>
                            </g>)
                        }
                        )}
                        {/* Nodes */}
                        {nodes.map((node, index) => (
                            <g key={`node-${index}`}>
                                <circle className="transition-colors duration-1000"
                                    cx={node.x}
                                    cy={node.y}
                                    r={nodeRadious}
                                    fill={node.flag ? "red" : "white"}
                                    stroke={node.flag ? "black" : "lightgray"}
                                    strokeWidth={Math.floor(nodeRadious / 4)}
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={nodeRadious}
                                    fontWeight='bold'
                                    fill={node.flag ? "white" : "black"}
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
