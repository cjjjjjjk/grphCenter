import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

const Dijkstra = function (startNode: string, neighborNodes: Map<string, { id: string, weight: number }[]>, distances: Map<string, number>, previous: Map<string, string | null>, endNode?: string)
    : string[] | void {
    const unvisited = new Set(neighborNodes.keys());
    distances.set(startNode, 0);

    while (unvisited.size > 0) {
        let currentNode = Array.from(unvisited).reduce((minNode, node) =>
            (distances.get(node)! < distances.get(minNode)!) ? node : minNode,
            Array.from(unvisited)[0]);

        unvisited.delete(currentNode);

        if (endNode && currentNode === endNode) {
            const path: string[] = [];
            let current = endNode;
            while (current) {
                path.unshift(current);
                current = previous.get(current) || "";
            }
            return path;
        }

        const neighbors = neighborNodes.get(currentNode) || [];
        for (const neighbor of neighbors) {
            if (unvisited.has(neighbor.id)) {
                const newDist = distances.get(currentNode)! + neighbor.weight;
                if (newDist < distances.get(neighbor.id)!) {
                    distances.set(neighbor.id, newDist);
                    previous.set(neighbor.id, currentNode);
                }
            }
        }
    }

    return;
};

export const DijikastrareturnNewgraph = function ({ nodes: base_Nodes, links: base_Links }: { nodes: CustomNode[], links: CustomLink[] }, startNode: string, endNode?: string)
    : { nodes: CustomNode[], links: CustomLink[], path: string[], cost: number } {
    const rs_nodes: CustomNode[] = base_Nodes.map((cNode) => ({ ...cNode }));
    const rs_links: CustomLink[] = base_Links.map((cLink) => ({ ...cLink }));

    const neighborNodes: Map<string, { id: string, weight: number }[]> = new Map();
    rs_links.forEach((cLink) => {
        if (!neighborNodes.get(cLink.source.id)) neighborNodes.set(cLink.source.id, []);
        if (!neighborNodes.get(cLink.target.id)) neighborNodes.set(cLink.target.id, []);
        neighborNodes.get(cLink.source.id)?.push({ id: cLink.target.id, weight: cLink.weight || 0 });
        neighborNodes.get(cLink.target.id)?.push({ id: cLink.source.id, weight: cLink.weight || 0 });
    });

    const distances: Map<string, number> = new Map();
    const previous: Map<string, string | null> = new Map();
    rs_nodes.forEach((node) => distances.set(node.id, Infinity));
    rs_nodes.forEach((node) => previous.set(node.id, null));

    const result = Dijkstra(startNode, neighborNodes, distances, previous, endNode);

    if (result) {
        result.forEach((node) => {
            rs_nodes.map((rs_node) => {
                if (rs_node.id === node) rs_node.flag = true;
            });
            rs_links.forEach((link) => {
                if ((link.source.id === node && link.target.id === previous.get(node))
                    || (link.target.id === node && link.source.id === previous.get(node)))
                    link.flag = true;
            });
        });
        return { nodes: rs_nodes, links: rs_links, path: result, cost: distances.get(endNode!) || 0 };
    }

    return { nodes: rs_nodes, links: rs_links, path: [], cost: 0 };
};
