import { CustomNode } from "../entity/node";
import { CustomLink } from "../entity/link";

const HamiltonCycle = function (currentNode: string, startNode: string, count: number, numberOfNodes: number, visited: Set<string>, path: string[], neighborNodes: Map<string, string[]>)
    : boolean {
    if (count === numberOfNodes) {
        if (neighborNodes.get(currentNode)?.includes(startNode)) {
            path.push(startNode);
            return true;
        }
        return false;
    }

    for (const neighbor of neighborNodes.get(currentNode) || []) {
        if (!visited.has(neighbor)) {
            visited.add(neighbor);
            path.push(neighbor);

            if (HamiltonCycle(neighbor, startNode, count + 1, numberOfNodes, visited, path, neighborNodes))
                return true;
            visited.delete(neighbor);
            path.pop();
        }
    }

    return false;
};

export const HamiltonReturnNewGraph = function (input_nodes: CustomNode[], input_links: CustomLink[], numberOfNodes: number): { nodes: CustomNode[]; links: CustomLink[]; hamiton?: boolean } {
    let rs_nodes = input_nodes.map((node) => ({ ...node }));
    let rs_links = input_links.map((link) => ({ ...link }));

    let neighborNodes: Map<string, string[]> = new Map();
    rs_links.forEach((link) => {
        const v = link.source.id;
        const e = link.target.id;

        if (!neighborNodes.get(v)) {
            neighborNodes.set(v, []);
        }
        if (!neighborNodes.get(e)) {
            neighborNodes.set(e, []);
        }
        neighborNodes.get(v)?.push(e);
        neighborNodes.get(e)?.push(v);
    });

    let path: string[] = [];
    let visited: Set<string> = new Set();
    for (const node of rs_nodes) {
        visited.add(node.id);
        path = [node.id];

        if (HamiltonCycle(node.id, node.id, 1, numberOfNodes, visited, path, neighborNodes)) {
            rs_links.forEach((link) => {
                const sourceIndex = path.indexOf(link.source.id);
                const targetIndex = path.indexOf(link.target.id)
                if ((Math.abs(sourceIndex - targetIndex) === 1) || (Math.abs(sourceIndex - targetIndex) === path.length - 2)) {
                    link.flag = true;
                }
            });

            rs_nodes.map((node) => {
                node.flag = true;
                return node
            })
            return { nodes: rs_nodes, links: rs_links, hamiton: true };
        }

        visited.clear();
    }

    return { nodes: rs_nodes, links: rs_links, hamiton: false };
};
