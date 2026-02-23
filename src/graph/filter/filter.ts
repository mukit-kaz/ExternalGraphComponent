import { FilterType } from "./graphFilterComponent";
import { GraphFilterForText, GraphFilterNames, GraphFilterType } from "../../enums/graph-filter-type-enums";
import { EdgeType, NodeType } from "../type/type";

export function FilterNodeAndEdge(
  filters: FilterType[],
  filteredEdge: EdgeType[],
  filteredNode: NodeType[]
) {
    return filteredNode.forEach(node=>{
      const edge = filteredEdge.filter(edge=>edge.fromNode===node.name);
      node.filterd = applyFilters(node,edge, filters);
  });
}

function applyFilters( node: NodeType, edges: EdgeType[], filters: FilterType[]): boolean {
  if(filters.length<=0) return false;
  
  return filters.every((filter) => {
    if (filter.type === GraphFilterType.OwnershipPercentage) {
      edges.forEach((edge) => {
        edge.filterd = applyFilterOwnership(node, edge, filter);
      });
      return edges.some((edge) => edge.filterd);
    }
    // else if (filter.type === GraphFilterType.Ownership)
    //   return applyFilterOwner(node, filter);
    else return applyFilter(node, filter);
  });
}

function applyFilter(node: NodeType, filter: FilterType): boolean {
  const nodeValue = node[filter.type]?.toLowerCase();
  const filterValue = filter.value?.toLowerCase();

  if(!nodeValue || !filterValue)
  return false;

  switch (filter.logic) {
    case GraphFilterForText.EQUALS:
      return nodeValue === filterValue
    case GraphFilterForText.NOT_EQUALS:
      return nodeValue !== filterValue
    case GraphFilterForText.MATCH:
      return nodeValue.includes(filterValue);
  
    default:
      return false;
  }
}
function applyFilterOwnership( node: NodeType, edge: EdgeType, filter: FilterType): boolean {
  if (!edge || (filter.entity!=='all' && node.name!==filter.entity)) return false;

  const nodeValue = edge.percentage;
  const filterValue = Number(filter.value);

  switch (filter.logic) {
    case GraphFilterNames.EQUALS:
      return nodeValue === filterValue;
    case GraphFilterNames.NOT_EQUALS:
      return nodeValue !== filterValue;
    case GraphFilterNames.GREATER_THAN:
      return edge.percentage > Number(filter.value);
    case GraphFilterNames.LESS_THAN:
      return edge.percentage < Number(filter.value);

    default:
      return false;
  }
}
// function applyFilterOwner(node: NodeType, filter: FilterType): boolean {
//   const nodeValue = node[filter.type]?.toLowerCase();
//   const filterValue = filter.value?.toLowerCase();

//   switch (filter.logic) {
//     case GraphFilterForText.EQUALS:
//       return nodeValue === filterValue
//     case GraphFilterForText.NOT_EQUALS:
//       return nodeValue !== filterValue
//     case GraphFilterForText.MATCH:
//       return nodeValue.includes(filterValue);
  
//     default:
//       return false;
//   }
// }
