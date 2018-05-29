declare module TestTree {

  export interface Leaf {
    label: string;
    icon: string;
    data: string;
  }

  export interface Children {
    label: string;
    data: string;
    expandedIcon: string;
    collapsedIcon: string;
    children: Leaf[];
    icon: string;
  }

  export interface NodeData {
    label: string;
    data: string;
    expandedIcon: string;
    collapsedIcon: string;
    children: Children[];
  }

  export interface TreeObject {
    data: NodeData[];
  }
}

