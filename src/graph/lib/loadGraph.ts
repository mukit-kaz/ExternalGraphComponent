import { project } from "./Projection";
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildLabelConfiguration,
  buildNodesSourceData,
} from "./GraphBuilder";
import type { NodesSourceData, EdgesSourceData } from "./GraphBuilder";
import type { LayoutControll, NodeWithEdge, EdgeType, NodeType } from "../types/type";
import { CompanyGraphMode } from "../types/type";
import { SetLayout } from "./SetLayout";
import { ShapeNodeCreator, TableNodeCreator } from "./GraphTable";
import { ViewMode } from "../types/constant";



export default async function loadGraph(
  data: NodeWithEdge,
  selectedLayout: string,
  selectedOrientation: unknown,
  controll: LayoutControll
) {

  const nodeCreator = controll.view===ViewMode.Table ? await TableNodeCreator(data,controll) : await ShapeNodeCreator(data,controll);
  const nodeCreatorFilterd = controll.view===ViewMode.Table ? await TableNodeCreator(data,controll,true): await ShapeNodeCreator(data,controll,true);

  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: (item) => {
      const edge = item as EdgeType;
      return edge.percentage === 0 ? '' : edge.percentage + "%";
    },
    fill: () => "#FFFFFF",
  });
  const labelConfiguration3 = await buildLabelConfiguration({
    textBinding: (item) => {
      const edge = item as EdgeType;
      return edge.percentage === 0 ? '' : edge.percentage + "%";
    },
    fill: () => "#FFFFFF",
  });
  const edgeCreator = await buildEdgeCreator([labelConfiguration2], controll, {
    stroke: () => `2px ${controll?.mode===CompanyGraphMode.TpView?'dashed':''} ${controll?.shapeEdgeColor?.shapeEdgeColor}`,
    sourceArrow: () => "none",
    targetArrow: () => "triangle",
    tagProvider: (item) => {
      const edge = item as EdgeType;
      const from = data.nodes.find((node) => node.id == edge.fromNode);
      const to = data.nodes.find((node) => node.id == edge.toNode);
      return edge.percentage === 0
      ? `${from?.name} owned ${to?.name}`
      : `${from?.name} owned ${edge.percentage}% of ${to?.name}`;
    },
  });
  const edgeCreator2 = await buildEdgeCreator([labelConfiguration3], controll, {
    stroke: () => `2px ${controll?.mode===CompanyGraphMode.TpView?'dashed':''} ${controll?.shapeEdgeColor?.shapeFilterdEdgeColor}`,
    sourceArrow: () => "none",
    targetArrow: () => "triangle",
    tagProvider: (item) => {
      const edge = item as EdgeType;
      const from = data.nodes.find((node) => node.id == edge.fromNode);
      const to = data.nodes.find((node) => node.id == edge.toNode);
      return edge.percentage === 0
      ? `${from?.name} owned ${to?.name}`
      : `${from?.name} owned ${edge.percentage}% of ${to?.name}`;
    },
  });

  const out = await project<NodeWithEdge>(data, {
    binding: (item) => (item as NodeWithEdge).nodes.filter((x) => !x.filterd),
  }) as NodeType[];
  const out_filterd = await project<NodeWithEdge>(data, {
    binding: (item) => (item as NodeWithEdge).nodes.filter((x) => x.filterd),
  }) as NodeType[];

  const nodesSource = await buildNodesSourceData(
    { data: out, nodeCreator },
    { idProvider: (item) => (item as NodeType).id }
  );
  const nodesSourceFilterd = await buildNodesSourceData(
    { data: out_filterd, nodeCreator: nodeCreatorFilterd },
    { idProvider: (item) => (item as NodeType).id }
  );
  const out2 = await project<NodeWithEdge>(data, {
    binding: (item) => (item as NodeWithEdge).edges.filter((x) => !x.filterd),
  }) as EdgeType[];
  const edgesSource = await buildEdgesSourceData(
    { data: out2, edgeCreator },
    {
      idProvider: (item) => (item as EdgeType).id,
      sourceIdProvider: (item) => (item as EdgeType).fromNode,
      targetIdProvider: (item) => (item as EdgeType).toNode,
    }
  );

  const out2_filterd = await project<NodeWithEdge>(data, {
    binding: (item) => (item as NodeWithEdge).edges.filter((x) => x.filterd),
  }) as EdgeType[];
  const edgesSource_filterd = await buildEdgesSourceData(
    { data: out2_filterd, edgeCreator: edgeCreator2 },
    {
      idProvider: (item) => (item as EdgeType).id,
      sourceIdProvider: (item) => (item as EdgeType).fromNode,
      targetIdProvider: (item) => (item as EdgeType).toNode,
    }
  );

  const graph = await buildGraph({
    nodesSources: [nodesSource, nodesSourceFilterd] as NodesSourceData<unknown>[],
    edgesSources: [edgesSource, edgesSource_filterd] as EdgesSourceData<unknown>[],
  });

  const out3 = await SetLayout(
    graph,
    selectedLayout,
    selectedOrientation,
    controll
  );

  return out3;
}
