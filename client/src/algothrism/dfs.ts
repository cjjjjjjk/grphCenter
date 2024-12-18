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
const DFSReturnNewGraph = function ({ nodes: base_Nodes, links: base_Links, startNode: startNode }: { nodes: CustomNode[], links: CustomLink[], startNode: string }): { nodes: CustomNode[], links: CustomLink[], path: string[], linkpath: string[] } {
    let rs_nodes: CustomNode[] = base_Nodes.map((node) => ({ ...node }));
    let rs_links: CustomLink[] = base_Links.map((link) => ({ ...link }));

    const Nodepath: string[] = []
    const Linkpath: string[] = []
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

    dfs(startNode, neighborNodes, Nodepath, flag)


    Nodepath.forEach((node) => {
        rs_nodes.map((rs_node) => {
            if (rs_node.id === node) {
                rs_node.flag = true;
            }
        })
    })

    for (let i = 0; i < Nodepath.length - 1; i++) {
        const sourceId = Nodepath[i];
        const targetId = Nodepath[i + 1];
        const link = rs_links.find(link =>
            (link.source.id === sourceId && link.target.id === targetId) ||
            (link.source.id === targetId && link.target.id === sourceId)
        );
        if (link) {
            link.flag = true;
            if (!Linkpath.includes(link.id)) Linkpath.push(link.id);
        }
    }

    console.log("DFS NodePath: ", Nodepath)
    return { nodes: rs_nodes, links: rs_links, path: Nodepath, linkpath: Linkpath }
}

export default DFSReturnNewGraph