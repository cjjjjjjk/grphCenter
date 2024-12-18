import { CustomNode } from "./node";

export interface CustomLink {
    id: string,
    source: CustomNode;
    target: CustomNode;
    weight?: number;
    flag?: boolean;
}