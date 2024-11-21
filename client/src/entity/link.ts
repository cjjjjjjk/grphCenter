import { CustomNode } from "./node";

export interface CustomLink {
    source: CustomNode;
    target: CustomNode;
    weight?: number;
    flag?: boolean;
}