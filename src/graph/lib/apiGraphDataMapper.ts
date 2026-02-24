import type { NodeWithEdge, NodeType, EdgeType } from "../types/type";

export const ApiBusinessTypeConstants = {
  Ultimate_Parent_Entity: "Ultimate Parent Entity (UPE)",
  Company: "Company",
  Branch_Site_Service_PE: "Branch/Site/Service PE",
  Exempt_PE: "Exempt PE",
  Digital_PE: "Digital PE",
  Finance_Branch: "Finance Branch",
  Pass_Through_Entity: "Pass-Through Entity",
  Trust_or_similar_body: "Trust or similar body",
} as const;

export type ApiOwnerData = {
  OwnerName: string;
  OwnerPercentage: number;
};

export type ApiTaxData = {
  [key: string]: unknown;
};

export type ApiEntityData = {
  ChartId: number;
  Id: number;
  Code: string;
  Name: string;
  IncorporationJurisdiction: string;
  EntityOwnerList: ApiOwnerData[];
  EntityTaxList: ApiTaxData[];
  BusinessType: string;
  TaxResidenceJurisdiction: string;
  SubNational: string;
  BusinessSICCode: string;
};

export type CompanyChartApiResponse = ApiEntityData[];

export function mapApiResponseToGraphData(
  apiResponse: CompanyChartApiResponse
): NodeWithEdge {
  const entityMap = new Map<string, ApiEntityData>();
  apiResponse.forEach(entity => {
    entityMap.set(entity.Name, entity);
  });

  const nodes: NodeType[] = apiResponse.map(entity => ({
    id: entity.Name,
    name: entity.Name,
    businessType: normalizBusinessType(entity.BusinessType),
    entityCode: entity.Code,
    incorporationJurisdiction: entity.IncorporationJurisdiction,
    taxResidenceJurisdiction: entity.TaxResidenceJurisdiction,
    subNational: entity.SubNational || undefined,
    sicCode: entity.BusinessSICCode,
    databaseId: entity.Id.toString(),
  }));

  const edges: EdgeType[] = [];

  apiResponse.forEach(entity => {
    entity.EntityOwnerList.forEach(owner => {
      if (owner.OwnerName.toLowerCase() === 'parent') {
        return;
      }

      if (!entityMap.has(owner.OwnerName)) {
        console.warn(
          `Owner "${owner.OwnerName}" not found in entity list for "${entity.Name}"`
        );
        return;
      }
      const edgeId = `${owner.OwnerName}${entity.Name}`;
      edges.push({
        id: edgeId,
        fromNode: owner.OwnerName,
        toNode: entity.Name,
        percentage: owner.OwnerPercentage,
      });
    });
  });

  return { nodes, edges };
}


function normalizBusinessType(apiBusinessType: string): string {
  const allBusinessTypes = Object.values(ApiBusinessTypeConstants) as readonly string[];
  
  if (allBusinessTypes.includes(apiBusinessType)) {
    return apiBusinessType;
  }
  console.warn(
    `Unknown business type "${apiBusinessType}". Available types: ${allBusinessTypes.join(", ")}`
  );
  return apiBusinessType;
}

export function validateGraphData(
  graphData: NodeWithEdge
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const nodeIds = new Set(graphData.nodes.map(n => n.id));

  graphData.edges.forEach(edge => {
    if (!nodeIds.has(edge.fromNode)) {
      errors.push(
        `Edge "${edge.id}": fromNode "${edge.fromNode}" does not exist in nodes`
      );
    }
    if (!nodeIds.has(edge.toNode)) {
      errors.push(
        `Edge "${edge.id}": toNode "${edge.toNode}" does not exist in nodes`
      );
    }
    if (edge.percentage < 0 || edge.percentage > 100) {
      errors.push(
        `Edge "${edge.id}": percentage must be between 0 and 100, got ${edge.percentage}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function findRootEntity(
  graphData: NodeWithEdge
): NodeType | undefined {
  const nodesWithParents = new Set<string>();
  
  graphData.edges.forEach(edge => {
    nodesWithParents.add(edge.toNode);
  });

  const rootNode = graphData.nodes.find(
    node => !nodesWithParents.has(node.id)
  );

  return rootNode;
}

export function filterGraphData(
  graphData: NodeWithEdge,
  nodePredicate: (node: NodeType) => boolean
): NodeWithEdge {
  const filteredNodes = graphData.nodes.filter(nodePredicate);
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

  const filteredEdges = graphData.edges.filter(
    edge =>
      filteredNodeIds.has(edge.fromNode) && filteredNodeIds.has(edge.toNode)
  );

  return { nodes: filteredNodes, edges: filteredEdges };
}

export function processCompanyChartApiResponse(
  apiResponse: CompanyChartApiResponse
): NodeWithEdge {
    if (!Array.isArray(apiResponse)) {
        throw new Error('Invalid API response: expected an array of entities');
    }

    if (apiResponse.length === 0) {
        throw new Error('Invalid API response: empty entity list');
    }
    return mapApiResponseToGraphData(apiResponse);
}