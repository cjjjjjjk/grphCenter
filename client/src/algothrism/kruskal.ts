import { CustomNode } from "../entity/node"
import { CustomLink } from "../entity/link"

class UnionFind {
    parent: Map<string, string | undefined>;

    constructor(nodes_input: CustomNode[]) {
        this.parent = new Map();

        for (const node of nodes_input) {
            this.parent.set(node.id, node.id)
        }
    }

    find(nodeId: string): string {
        const parentNode = this.parent.get(nodeId);

        if (parentNode !== nodeId && parentNode !== undefined) {
            const root = this.find(parentNode);
            this.parent.set(nodeId, root);
            return root;
        }

        return parentNode ?? nodeId;
    }

    union(nodeId_1: string, nodeId_2: string): void {
        const r1 = this.find(nodeId_1)
        const r2 = this.find(nodeId_2)
        if (r1 !== r2) {
            this.parent.set(r1, r2);
        }
    }

}

export function KruskalReturnNewNodesandLinks(nodes_input: CustomNode[], links_input: CustomLink[]): { nodes: CustomNode[], links: CustomLink[], MST: number } {
    const unionfind = new UnionFind(nodes_input)
    // copy input graph.
    let rs_nodes = nodes_input.map(node => ({ ...node }));
    let rs_links = links_input.map(link => ({ ...link }));
    let rs_MST: number = 0;
    const sorted_link = [...links_input].sort((a, b) => (a.weight ? a.weight : 0) - (b.weight ? b.weight : 0))

    for (const link of sorted_link) {
        const { source, target } = link;
        if (unionfind.find(source.id) != unionfind.find(target.id)) {
            rs_links.map(flag_link => {
                if (flag_link.source.id == source.id && flag_link.target.id == target.id) {
                    flag_link.flag = true;
                    rs_MST += flag_link.weight ? flag_link.weight : 0;
                    return flag_link
                } else return flag_link
            });
            rs_nodes.map(flag_node => {
                if (flag_node.id == source.id || flag_node.id == target.id) {
                    flag_node.flag = true;
                    return flag_node;
                } else {
                    return flag_node
                }
            })

            unionfind.union(source.id, target.id)
        }
    }

    return { nodes: rs_nodes, links: rs_links, MST: rs_MST };
}
