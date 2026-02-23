import { project } from "./Projection";
import {
  buildEdgeCreator,
  buildEdgesSourceData,
  buildGraph,
  buildLabelConfiguration,
  buildNodesSourceData,
} from "./GraphBuilder";
import { LayoutControll, NodeWithEdge,CompanyGraphMode } from "../type/type";
import { SetLayout } from "./SetLayout";
import { ShapeNodeCreator, TableNodeCreator } from "./GraphTable";
import { ViewMode } from "../type/constant";



export default async function loadGraph(
  data: NodeWithEdge,
  selectedLayout: string,
  selectedOrientation: any,
  controll: LayoutControll
) {

  const nodeCreator = controll.view===ViewMode.Table ? await TableNodeCreator(data,controll) : await ShapeNodeCreator(data,controll);
  const nodeCreatorFilterd = controll.view===ViewMode.Table ? await TableNodeCreator(data,controll,true): await ShapeNodeCreator(data,controll,true);

  const labelConfiguration2 = await buildLabelConfiguration({
    textBinding: (item) => item.percentage===0? '' : item.percentage + "%",
    fill: () => "#FFFFFF",
  });
  const labelConfiguration3 = await buildLabelConfiguration({
    textBinding: (item) => item.percentage===0? '' : item.percentage + "%",
    fill: () => "#FFFFFF",
  });
  const edgeCreator = await buildEdgeCreator([labelConfiguration2], controll, {
    stroke: () => `2px ${controll?.mode===CompanyGraphMode.TpView?'dashed':''} ${controll?.shapeEdgeColor?.shapeEdgeColor}`,
    sourceArrow: () => "none",
    targetArrow: () => "triangle",
    tagProvider: (item) => {
      const from = data.nodes.find((node) => node.id == item.fromNode);
      const to = data.nodes.find((node) => node.id == item.toNode);
      return item.percentage===0
      ? `${from.name} owned ${to.name}`
      : `${from.name} owned ${item.percentage}% of ${to.name}`;
    },
  });
  const edgeCreator2 = await buildEdgeCreator([labelConfiguration3], controll, {
    stroke: () => `2px ${controll?.mode===CompanyGraphMode.TpView?'dashed':''} ${controll?.shapeEdgeColor?.shapeFilterdEdgeColor}`,
    sourceArrow: () => "none",
    targetArrow: () => "triangle",
    tagProvider: (item) => {
      const from = data.nodes.find((node) => node.id == item.fromNode);
      const to = data.nodes.find((node) => node.id == item.toNode);
      return item.percentage===0
      ? `${from.name} owned ${to.name}`
      : `${from.name} owned ${item.percentage}% of ${to.name}`;
    },
  });

  const out = await project<NodeWithEdge>(data, {
    binding: (item) => item.nodes.filter((x) => !x.filterd),
  });
  const out_filterd = await project<NodeWithEdge>(data, {
    binding: (item) => item.nodes.filter((x) => x.filterd),
  });

  const nodesSource = await buildNodesSourceData(
    { data: out, nodeCreator },
    { idProvider: (item) => item.id }
  );
  const nodesSourceFilterd = await buildNodesSourceData(
    { data: out_filterd, nodeCreator: nodeCreatorFilterd },
    { idProvider: (item) => item.id }
  );
  const out2 = await project(data, {
    binding: (item) => item.edges.filter((x) => !x.filterd),
  });
  const edgesSource = await buildEdgesSourceData(
    { data: out2, edgeCreator },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.fromNode,
      targetIdProvider: (item) => item.toNode,
    }
  );

  const out2_filterd = await project(data, {
    binding: (item) => item.edges.filter((x) => x.filterd),
  });
  const edgesSource_filterd = await buildEdgesSourceData(
    { data: out2_filterd, edgeCreator: edgeCreator2 },
    {
      idProvider: (item) => item.id,
      sourceIdProvider: (item) => item.fromNode,
      targetIdProvider: (item) => item.toNode,
    }
  );

  const graph = await buildGraph({
    nodesSources: [nodesSource, nodesSourceFilterd],
    edgesSources: [edgesSource, edgesSource_filterd],
  });

  const out3 = await SetLayout(
    graph,
    selectedLayout,
    selectedOrientation,
    controll
  );

  return out3;
}