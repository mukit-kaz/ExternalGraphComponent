import { arrange } from "./Layout";
import { Graph_Layout } from "../types/constant";
import { IGraph } from "@yfiles/yfiles";
import type { LayoutControll } from "../types/type";

export async function SetLayout(
  graph: IGraph,
  selectedLayout: string,
  selectedOrientation: unknown,
  controll: LayoutControll
) {
  switch (selectedLayout) {
    case Graph_Layout.Hierarchic:
      return await LayoutHierarchic(graph, selectedOrientation as "top-to-bottom" | "bottom-to-top" | "left-to-right" | "right-to-left", controll);

    case Graph_Layout.Tree:
      return await LayoutTree(graph, selectedOrientation as "top-to-bottom" | "left-to-right" | "right-to-left" | "bottom-to-top", controll);

    case Graph_Layout.Circular:
      return await LayoutCircular(graph, selectedOrientation as "bcc-compact" | "bcc-isolated" | "custom-groups" | "single-cycle", controll);

    case Graph_Layout.Orthogonal:
      return await LayoutOrthogonal(graph, controll);

    case Graph_Layout.Organic:
      return await LayoutOrganic(graph, controll);

    default:
      return await LayoutHierarchic(graph, selectedOrientation as "top-to-bottom" | "bottom-to-top" | "left-to-right" | "right-to-left", controll);
  }
}

async function LayoutHierarchic(
  graph: IGraph,
  selectedOrientation:
    | "top-to-bottom"
    | "bottom-to-top"
    | "left-to-right"
    | "right-to-left",
  controll: LayoutControll
) {
  return arrange(graph, {
    worker: false,
    name: "HierarchicLayout",
    properties: {
      layoutOrientation: selectedOrientation,
      integratedEdgeLabeling: controll.integratedEdgeLabeling,
      nodeToNodeDistance: controll.nodeToNodeDistance,
      minimumLayerDistance: controll.minimumLayerDistance,
      automaticEdgeGrouping: controll.automaticEdgeGrouping,
      gridColumns: undefined,
      gridRows: undefined,
      edgeToEdgeDistance: controll.edgeToEdgeDistance,
      nodeToEdgeDistance: controll.nodeToEdgeDistance,
    },
  });
}
async function LayoutOrganic(graph: IGraph, controll: LayoutControll) {
  return arrange(graph, {
    worker: false,
    name: "OrganicLayout",
    properties: {
      labelingEnabled: controll.labelingEnabled,
      preferredEdgeLength: controll.preferredEdgeLength,
      minimumNodeDistance: controll.minimumNodeDistance,
      compactnessFactor: controll.compactnessFactor,
      preferredMinimumNodeToEdgeDistance:
        controll.preferredMinimumNodeToEdgeDistance,
    },
  });
}
async function LayoutOrthogonal(graph: IGraph, controll: LayoutControll) {
  return arrange(graph, {
    worker: false,
    name: "OrthogonalLayout",
    properties: {
      gridSpacing: controll.gridSpacing,
      integratedEdgeLabeling: controll.integratedEdgeLabeling,
    },
  });
}
async function LayoutCircular(
  graph: IGraph,
  selectedOrientation:
    | "bcc-compact"
    | "bcc-isolated"
    | "custom-groups"
    | "single-cycle",
  controll: LayoutControll
) {
  return await arrange(graph, {
    worker: false,
    name: "CircularLayout",
    properties: {
      labelingEnabled: controll.labelingEnabled,
      layoutStyle: selectedOrientation,
    },
  });
}
async function LayoutTree(
  graph: IGraph,
  selectedOrientation:
    | "top-to-bottom"
    | "left-to-right"
    | "right-to-left"
    | "bottom-to-top",
  controll: LayoutControll
) {
  return await arrange(graph, {
    worker: false,
    name: "TreeLayout",
    properties: {
      layoutOrientation: selectedOrientation,
      integratedEdgeLabeling: controll.integratedEdgeLabeling,
      nodeDistance: controll.nodeDistance,
    },
  });
}
