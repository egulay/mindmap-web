declare module TestTree {

  export interface InnerChildren {
    label: string;
    icon: string;
    data: string;
  }

  export interface Children {
    label: string;
    data: string;
    expandedIcon: string;
    collapsedIcon: string;
    children: InnerChildren[];
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

