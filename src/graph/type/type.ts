export type NodeType = {
  id: string;
  name?: string;
  filterd?: boolean;

  databaseId?: string;
  entityCode?: string;
  incorporationJurisdiction?: string;
  subNational?: string;
  sicCode?: string;
  businessType?: string;
  taxCharList?: string;
  taxResidenceJurisdiction?: string;

  heatAmount?: number
};
export type EdgeType = {
  id?: string;
  fromNode: string;
  toNode: string;
  percentage: number;
  filterd?: boolean;
};
export type NodeWithEdge = { nodes: NodeType[]; edges: EdgeType[] };
export type GraphLayout = {
  name: string;
  layout: string;
  orientation?: GraphLayout[];
};

export type GraphOption = {
  isDashboard?: boolean;
};

export type LayoutControll = {
  integratedEdgeLabeling?: boolean;
  automaticEdgeGrouping?: boolean;
  labelingEnabled?: boolean;
  nodeToNodeDistance?: number;
  minimumLayerDistance?: number;
  edgeToEdgeDistance?: number;
  nodeToEdgeDistance?: number;
  preferredEdgeLength?: number;
  minimumNodeDistance?: number;
  compactnessFactor?: number;
  preferredMinimumNodeToEdgeDistance?: number;
  gridSpacing?: number;
  nodeDistance?: number;
  preset?: string;

  typeShapes?:TypeShape[];

  shapeColors?:TypeShapeColor[];
  shapeColorHighlight?:ShapeColor;
  shapeEdgeColor?:ShapeEdgeColor;

  tableColors?:TypeTableColor[];
  tableBodyColor?:TableBodyColor;
  tableBodyHighlightColor?:TableBodyColor;

  view?: 'table'|'shape' | string;
  
  mode?: string;
};

export type TypeShape={key?: string, shape?: string}
export type TypeShapeColor={key?: string, value?: ShapeColor}
export type TypeTableColor={key?: string, value?: TableColor}

export type ShapeColor={
  shapeBgColor?: string;
  shapeBorderColor?: string;
  shapeTextColor?: string;
}
export type ShapeEdgeColor={
  shapeEdgeColor?: string;
  shapeFilterdEdgeColor?: string;
}

export type TableColor={
  tableBorderColor?: string;
}
export type TableBodyColor={
  titleColor?: string;
  titleBgColor?: string;
  tableBgColor?: string;
  tableColTextColor?: string;
  tableTextColor?: string;
  tableBorderColor?: string;
}

export type ShapeStyle={
  borderStyle:'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none' | 'hidden';
}

export const CompanyGraphMode={
  Entity:'entity',TpView:'tpView'
}