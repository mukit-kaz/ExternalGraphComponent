import type { NodeWithEdge } from "../types/type";
import { BusinessType } from "../constants/entityConstants";

/**
 * Sample graph data demonstrating a corporate ownership structure.
 * 
 * Structure:
 * - 1 Ultimate Parent Entity (root)
 * - 3 Company subsidiaries under the root
 * - 3 additional entities (Branch, Finance Branch, Pass-Through) as leaves
 * 
 * This data can be used for testing and demonstration purposes.
 */
export const dummyGraphData: NodeWithEdge = {
  nodes: [
    {
      id: "1",
      name: "Global Holdings Corp",
      businessType: BusinessType.Ultimate_Parent_Entity,
      entityCode: "GHC-001",
      incorporationJurisdiction: "United States",
    },
    {
      id: "2",
      name: "Tech Solutions Inc",
      businessType: BusinessType.Company,
      entityCode: "TSI-002",
      incorporationJurisdiction: "Delaware, USA",
    },
    {
      id: "3",
      name: "Finance Services Ltd",
      businessType: BusinessType.Company,
      entityCode: "FSL-003",
      incorporationJurisdiction: "United Kingdom",
    },
    {
      id: "4",
      name: "Manufacturing Co",
      businessType: BusinessType.Company,
      entityCode: "MFC-004",
      incorporationJurisdiction: "Germany",
    },
    {
      id: "5",
      name: "Asia Pacific Branch",
      businessType: BusinessType.Branch_Site_Service_PE,
      entityCode: "APB-005",
      incorporationJurisdiction: "Singapore",
    },
    {
      id: "6",
      name: "European Finance Branch",
      businessType: BusinessType.Finance_Branch,
      entityCode: "EFB-006",
      incorporationJurisdiction: "Luxembourg",
    },
    {
      id: "7",
      name: "Investment Trust",
      businessType: BusinessType.Pass_Through_Entity,
      entityCode: "INV-007",
      incorporationJurisdiction: "Cayman Islands",
    },
  ],
  edges: [
    {
      id: "e1",
      fromNode: "1",
      toNode: "2",
      percentage: 100,
    },
    {
      id: "e2",
      fromNode: "1",
      toNode: "3",
      percentage: 75,
    },
    {
      id: "e3",
      fromNode: "1",
      toNode: "4",
      percentage: 51,
    },
    {
      id: "e4",
      fromNode: "2",
      toNode: "5",
      percentage: 100,
    },
    {
      id: "e5",
      fromNode: "3",
      toNode: "6",
      percentage: 100,
    },
    {
      id: "e6",
      fromNode: "4",
      toNode: "7",
      percentage: 50,
    },
    {
      id: "e7",
      fromNode: "3",
      toNode: "7",
      percentage: 50,
    },
  ],
};
