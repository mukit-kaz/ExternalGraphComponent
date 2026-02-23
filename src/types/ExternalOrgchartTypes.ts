/**
 * External Orgchart Types
 * 
 * Type definitions for the external orgchart component.
 * These types define the data structures and configuration options
 * for integrating the orgchart into external applications.
 */

/**
 * Represents a node in the organizational chart
 */
export interface ExternalNodeType {
  id: string;
  name: string;
  entityCode: string;
  incorporationJurisdiction: string;
  subNational: string;
  sicCode: string;
  businessType: string;
  taxCharList: string;
  taxResidenceJurisdiction: string;
  heatAmount: number;
  filtered: boolean;
}

/**
 * Represents an edge (relationship) between nodes
 */
export interface ExternalEdgeType {
  id: string;
  fromNode: string;
  toNode: string;
  percentage: number;
  filtered: boolean;
}

/**
 * Graph data structure containing nodes and edges
 */
export interface ExternalGraphDataType {
  nodes: ExternalNodeType[];
  edges: ExternalEdgeType[];
}

/**
 * Filter type for filtering chart data
 */
export interface ExternalFilterType {
  id: string;
  type: string;
  entity: string;
  logic: string;
  value: string;
}

/**
 * Available layout algorithms
 */
export type LayoutType =
  | "HierarchicLayout"
  | "TreeLayout"
  | "OrganicLayout"
  | "OrthogonalLayout"
  | "CircularLayout";

/**
 * Layout orientation options
 */
export type OrientationType =
  | "top-to-bottom"
  | "bottom-to-top"
  | "left-to-right"
  | "right-to-left"
  | "";

/**
 * Shape configuration for node types
 */
export interface TypeShape {
  key: string;
  shape: "rectangle" | "hexagon" | "circle" | "ellipse";
}

/**
 * Color configuration for shapes
 */
export interface ShapeColor {
  shapeBgColor: string;
  shapeBorderColor: string;
  shapeTextColor: string;
}

/**
 * Shape color mapping
 */
export interface ShapeColorMapping {
  key: string;
  value: ShapeColor;
}

/**
 * Edge color configuration
 */
export interface ShapeEdgeColorType {
  shapeEdgeColor: string;
  shapeFilterdEdgeColor: string;
}

/**
 * Layout configuration options
 */
export interface LayoutConfig {
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
  typeShapes?: TypeShape[];
  shapeColors?: ShapeColorMapping[];
  shapeColorHighlight?: ShapeColor;
  shapeEdgeColor?: ShapeEdgeColorType;
  view?: string;
  mode?: string;
}

/**
 * Complete configuration for the orgchart component
 */
export interface ExternalOrgchartConfig {
  graphData: ExternalGraphDataType;
  layout: LayoutType;
  orientation?: OrientationType;
  filters?: ExternalFilterType[];
  layoutConfig?: LayoutConfig;
  title?: string;
  isLoading?: boolean;
}

/**
 * Callback functions for component interactions
 */
export interface ExternalOrgchartCallbacks {
  onNodeClick?: (node: ExternalNodeType) => void;
  onNodeDoubleClick?: (node: ExternalNodeType) => void;
  onNodeHover?: (node: ExternalNodeType | null) => void;
  onEdgeClick?: (edge: ExternalEdgeType) => void;
  onLayoutChange?: (layout: LayoutType) => void;
  onOrientationChange?: (orientation: OrientationType) => void;
  onFiltersChange?: (filters: ExternalFilterType[]) => void;
  onFiltersReset?: () => void;
}

/**
 * Props for the ExternalOrgchartComponent
 */
export interface ExternalOrgchartProps {
  config?: ExternalOrgchartConfig;
  callbacks?: ExternalOrgchartCallbacks;
  className?: string;
  style?: React.CSSProperties;
}
