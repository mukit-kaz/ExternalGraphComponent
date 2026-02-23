import {
  ExternalOrgchartConfig,
  ExternalNodeType,
  ExternalEdgeType,
} from "../types/ExternalOrgchartTypes";

/**
 * Sample nodes representing entities in an organizational chart
 */
export const dummyNodes: ExternalNodeType[] = [
  {
    id: "1",
    name: "Global Holdings Inc.",
    entityCode: "GHI001",
    incorporationJurisdiction: "United States",
    subNational: "Delaware",
    sicCode: "6719",
    businessType: "Holding Company",
    taxCharList: "C-Corp",
    taxResidenceJurisdiction: "United States",
    heatAmount: 100,
    filtered: false,
  },
  {
    id: "2",
    name: "Tech Solutions LLC",
    entityCode: "TSL002",
    incorporationJurisdiction: "United States",
    subNational: "California",
    sicCode: "7372",
    businessType: "Software Development",
    taxCharList: "LLC",
    taxResidenceJurisdiction: "United States",
    heatAmount: 85,
    filtered: false,
  },
  {
    id: "3",
    name: "European Operations GmbH",
    entityCode: "EOG003",
    incorporationJurisdiction: "Germany",
    subNational: "Bavaria",
    sicCode: "6719",
    businessType: "Regional Headquarters",
    taxCharList: "GmbH",
    taxResidenceJurisdiction: "Germany",
    heatAmount: 75,
    filtered: false,
  },
  {
    id: "4",
    name: "Asia Pacific Ltd.",
    entityCode: "APL004",
    incorporationJurisdiction: "Singapore",
    subNational: "",
    sicCode: "6719",
    businessType: "Regional Headquarters",
    taxCharList: "Private Limited",
    taxResidenceJurisdiction: "Singapore",
    heatAmount: 70,
    filtered: false,
  },
  {
    id: "5",
    name: "UK Trading Co.",
    entityCode: "UKTC005",
    incorporationJurisdiction: "United Kingdom",
    subNational: "England",
    sicCode: "4631",
    businessType: "Trading",
    taxCharList: "Limited Company",
    taxResidenceJurisdiction: "United Kingdom",
    heatAmount: 60,
    filtered: false,
  },
  {
    id: "6",
    name: "France Services SAS",
    entityCode: "FSS006",
    incorporationJurisdiction: "France",
    subNational: "Île-de-France",
    sicCode: "7022",
    businessType: "Consulting Services",
    taxCharList: "SAS",
    taxResidenceJurisdiction: "France",
    heatAmount: 55,
    filtered: false,
  },
  {
    id: "7",
    name: "China Manufacturing Co. Ltd.",
    entityCode: "CMC007",
    incorporationJurisdiction: "China",
    subNational: "Shanghai",
    sicCode: "3571",
    businessType: "Manufacturing",
    taxCharList: "WFOE",
    taxResidenceJurisdiction: "China",
    heatAmount: 80,
    filtered: false,
  },
  {
    id: "8",
    name: "India Development Pvt. Ltd.",
    entityCode: "IDP008",
    incorporationJurisdiction: "India",
    subNational: "Karnataka",
    sicCode: "7371",
    businessType: "R&D",
    taxCharList: "Private Limited",
    taxResidenceJurisdiction: "India",
    heatAmount: 65,
    filtered: false,
  },
  {
    id: "9",
    name: "Brazil Distribuidora Ltda.",
    entityCode: "BDL009",
    incorporationJurisdiction: "Brazil",
    subNational: "São Paulo",
    sicCode: "5045",
    businessType: "Distribution",
    taxCharList: "Ltda",
    taxResidenceJurisdiction: "Brazil",
    heatAmount: 50,
    filtered: false,
  },
  {
    id: "10",
    name: "Australia Sales Pty Ltd.",
    entityCode: "ASP010",
    incorporationJurisdiction: "Australia",
    subNational: "New South Wales",
    sicCode: "5065",
    businessType: "Sales",
    taxCharList: "Pty Ltd",
    taxResidenceJurisdiction: "Australia",
    heatAmount: 45,
    filtered: false,
  },
];

/**
 * Sample edges representing ownership relationships
 */
export const dummyEdges: ExternalEdgeType[] = [
  {
    id: "e1-2",
    fromNode: "1",
    toNode: "2",
    percentage: 100,
    filtered: false,
  },
  {
    id: "e1-3",
    fromNode: "1",
    toNode: "3",
    percentage: 100,
    filtered: false,
  },
  {
    id: "e1-4",
    fromNode: "1",
    toNode: "4",
    percentage: 100,
    filtered: false,
  },
  {
    id: "e3-5",
    fromNode: "3",
    toNode: "5",
    percentage: 75,
    filtered: false,
  },
  {
    id: "e3-6",
    fromNode: "3",
    toNode: "6",
    percentage: 100,
    filtered: false,
  },
  {
    id: "e4-7",
    fromNode: "4",
    toNode: "7",
    percentage: 80,
    filtered: false,
  },
  {
    id: "e4-8",
    fromNode: "4",
    toNode: "8",
    percentage: 100,
    filtered: false,
  },
  {
    id: "e4-9",
    fromNode: "4",
    toNode: "9",
    percentage: 60,
    filtered: false,
  },
  {
    id: "e4-10",
    fromNode: "4",
    toNode: "10",
    percentage: 100,
    filtered: false,
  },
];

/**
 * Sample filters for demonstration
 */
export const dummyFilters = [
  {
    id: "f1",
    type: "jurisdiction",
    entity: "incorporationJurisdiction",
    logic: "equals",
    value: "United States",
  },
  {
    id: "f2",
    type: "businessType",
    entity: "businessType",
    logic: "contains",
    value: "Headquarters",
  },
];

/**
 * Complete dummy configuration for the orgchart component
 */
export const dummyOrgchartConfig: ExternalOrgchartConfig = {
  graphData: {
    nodes: dummyNodes,
    edges: dummyEdges,
  },
  layout: "HierarchicLayout",
  orientation: "top-to-bottom",
  filters: [],
  layoutConfig: {
    integratedEdgeLabeling: true,
    automaticEdgeGrouping: false,
    labelingEnabled: true,
    nodeToNodeDistance: 100,
    minimumLayerDistance: 100,
    edgeToEdgeDistance: 30,
    nodeToEdgeDistance: 30,
    preferredEdgeLength: 100,
    minimumNodeDistance: 50,
    compactnessFactor: 0.5,
    preferredMinimumNodeToEdgeDistance: 30,
    gridSpacing: 50,
    nodeDistance: 100,
    preset: "polyline",
    typeShapes: [
      { key: "Holding Company", shape: "rectangle" },
      { key: "Regional Headquarters", shape: "hexagon" },
      { key: "Software Development", shape: "circle" },
      { key: "Manufacturing", shape: "rectangle" },
      { key: "default", shape: "circle" },
    ],
    shapeColors: [
      {
        key: "Holding Company",
        value: {
          shapeBgColor: "#E3F2FD",
          shapeBorderColor: "#1976D2",
          shapeTextColor: "#0D47A1",
        },
      },
      {
        key: "Regional Headquarters",
        value: {
          shapeBgColor: "#F3E5F5",
          shapeBorderColor: "#7B1FA2",
          shapeTextColor: "#4A148C",
        },
      },
      {
        key: "Software Development",
        value: {
          shapeBgColor: "#E8F5E9",
          shapeBorderColor: "#388E3C",
          shapeTextColor: "#1B5E20",
        },
      },
      {
        key: "Manufacturing",
        value: {
          shapeBgColor: "#FFF3E0",
          shapeBorderColor: "#F57C00",
          shapeTextColor: "#E65100",
        },
      },
      {
        key: "default",
        value: {
          shapeBgColor: "#F5F5F5",
          shapeBorderColor: "#9E9E9E",
          shapeTextColor: "#424242",
        },
      },
    ],
    shapeColorHighlight: {
      shapeBgColor: "#FFEB3B",
      shapeBorderColor: "#F57F17",
      shapeTextColor: "#000000",
    },
    shapeEdgeColor: {
      shapeEdgeColor: "#757575",
      shapeFilterdEdgeColor: "#D32F2F",
    },
    view: "shape",
    mode: "entity",
  },
  title: "Sample Organization Chart",
  isLoading: false,
};

/**
 * Alternative configuration with different layout
 */
export const dummyOrgchartConfigOrganic: ExternalOrgchartConfig = {
  ...dummyOrgchartConfig,
  layout: "OrganicLayout",
  orientation: undefined,
};

/**
 * Configuration with filters applied
 */
export const dummyOrgchartConfigFiltered: ExternalOrgchartConfig = {
  ...dummyOrgchartConfig,
  filters: dummyFilters,
};
