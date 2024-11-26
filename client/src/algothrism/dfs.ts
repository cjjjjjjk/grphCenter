import { pathHorizontalCurve } from "@visx/shape";
import { CustomLink } from "../entity/link"
import { CustomNode } from "../entity/node"
const dfs = function (currentNode: string, neighborNodes: Map<string, string[]>, path: string[], flag: Map<string, boolean>): void {
    if (flag.get(currentNode)) return;
    flag.set(currentNode, true)
    path.push(currentNode)

    neighborNodes.get(currentNode)?.sort((a, b) => Number(a) - Number(b));
    neighborNodes.get(currentNode)?.forEach((node) => {
        dfs(node, neighborNodes, path, flag);
    })
    return;
}
const DFSReturnNewGraph = function ({ nodes: base_Nodes, links: base_Links, startNode: startNode }: { nodes: CustomNode[], links: CustomLink[], startNode: string }): { nodes: CustomNode[], links: CustomLink[] } {
    let rs_nodes: CustomNode[] = base_Nodes.map((node) => ({ ...node }));
    let rs_links: CustomLink[] = base_Links.map((link) => ({ ...link }));

    const path: string[] = []
    const flag: Map<string, boolean> = new Map()

    let neighborNodes: Map<string, string[]> = new Map();
    rs_links.forEach((link) => {
        const v = link.source.id;
        const e = link.target.id;

        if (!neighborNodes.get(v)) neighborNodes.set(v, []);
        if (!neighborNodes.get(e)) neighborNodes.set(e, []);
        neighborNodes.get(v)?.push(e);
        neighborNodes.get(e)?.push(v);
    });

    dfs(startNode, neighborNodes, path, flag)


    path.forEach((node) => {
        rs_nodes.map((rs_node) => {
            if (rs_node.id === node) {
                rs_node.flag = true;
            }
        })
        rs_links.forEach((link) => {
            const sourceIndex = path.indexOf(link.source.id);
            const targetIndex = path.indexOf(link.target.id);
            if ((Math.abs(sourceIndex - targetIndex) === 1)) {
                link.flag = true;
            }
        });
    })

    console.log("DFS Path: ", path)
    return { nodes: rs_nodes, links: rs_links }
}

export default DFSReturnNewGraph