import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

const BFS = function (currentNode: string, path: string[], neighborNodes: Map<string, string[]>, BFSFlag: Map<string, boolean>, nodeDad: Map<string, string>, endNode?: string): void | string[] {
    neighborNodes.get(currentNode)?.sort((a, b) => Number(a) - Number(b))
    const queue: string[] = []

    queue.push(currentNode)
    BFSFlag.set(currentNode, true)

    while (queue.length > 0) {
        // shift(): get first element and delete it.
        const crr_node = queue.shift();
        if (!crr_node) return;
        path.push(crr_node)

        if (endNode && crr_node === endNode) {
            const resultPath: string[] = [];
            let current = endNode;
            while (current) {
                resultPath.unshift(current);
                current = nodeDad.get(current) || "";
            }
            return resultPath;
        }

        const neighbor = neighborNodes.get(crr_node) || [];
        for (const nb of neighbor) {
            if (!BFSFlag.get(nb)) {
                queue.push(nb);
                BFSFlag.set(nb, true);
                nodeDad.set(nb, crr_node);
            }
        }
    }


    return;
}

export const BfsReturnnewGraph = function ({ nodes: base_Nodes, links: base_Links }: { nodes: CustomNode[], links: CustomLink[] }, startNode: string, endNode?: string): { nodes: CustomNode[], links: CustomLink[], path: string[] } {
    const rs_nodes: CustomNode[] = base_Nodes.map((cNode) => ({ ...cNode }))
    const rs_links: CustomLink[] = base_Links.map((cLink) => ({ ...cLink }))

    const neighborNodes: Map<string, string[]> = new Map([]);
    rs_links.forEach((cLink) => {
        if (!neighborNodes.get(cLink.source.id)) neighborNodes.set(cLink.source.id, [])
        if (!neighborNodes.get(cLink.target.id)) neighborNodes.set(cLink.target.id, [])
        neighborNodes.get(cLink.source.id)?.push(cLink.target.id)
        neighborNodes.get(cLink.target.id)?.push(cLink.source.id)
    })

    const BFSFlag: Map<string, boolean> = new Map([])
    const NodeDad: Map<string, string> = new Map([])
    rs_nodes.forEach((node) => BFSFlag.set(node.id, false))

    const path: string[] = []
    const result = BFS(startNode, path, neighborNodes, BFSFlag, NodeDad, endNode);

    if (result) {
        result.forEach((node) => {
            rs_nodes.map((rs_node) => {
                if (rs_node.id === node) {
                    rs_node.flag = true;
                }
            });
            rs_links.forEach((link) => {
                if ((link.source.id === node && link.target.id === NodeDad.get(node))
                    || (link.target.id === node && link.source.id === NodeDad.get(node)))
                    link.flag = true;
            });
        });
        return { nodes: rs_nodes, links: rs_links, path: result };
    }


    path.forEach((node) => {
        rs_nodes.map((rs_node) => {
            if (rs_node.id === node) {
                rs_node.flag = true;
            }
        });
        rs_links.forEach((link) => {
            if ((link.source.id === node && link.target.id === NodeDad.get(node))
                || (link.target.id === node && link.source.id === NodeDad.get(node)))
                link.flag = true;
        });
    });
    return { nodes: rs_nodes, links: rs_links, path };
}
