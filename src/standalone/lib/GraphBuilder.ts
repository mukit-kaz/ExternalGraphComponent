import {
  Arrow,
  ArrowType,
  DefaultLabelStyle,
  EdgeCreator,
  EdgePathLabelModel,
  Fill,
  GraphBuilder,
  GroupNodeStyle,
  GroupNodeStyleTabPosition,
  IArrow,
  IGraph,
  ImageNodeStyle,
  InteriorLabelModel,
  LabelCreator,
  NodeCreator,
  Point,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeShape,
  ShapeNodeStyle,
  ShapeNodeStyleRenderer,
  Size,
  StringTemplateNodeStyle,
  Stroke,
  ArcEdgeStyle,
  BezierEdgeStyle,
} from "@yfiles/yfiles";

import type {
  FillConvertible,
  IdProviderConvertible,
  PointConvertible,
  RectConvertible,
  GeneratorLike,
  ShapeNodeShapeStringValues,
  StrokeConvertible,
} from "@yfiles/yfiles";

import type {
  LabelConfiguration,
} from "./GraphBuilderUtils";

import {
  asLayoutParameterForEdges,
  asLayoutParameterForGroupNodes,
  asLayoutParameterForNodes,
  configureLabelCreator,
  maybeAddBinding,
} from "./GraphBuilderUtils";
import type { LayoutControll } from "../types/type";
import { GraphPreset } from "../types/constant";
import { createReactComponentHtmlNodeStyleFromJSX } from "./jsx-compiler";

export type IdProvider<T> =
  | ((dataItem: T, canonicalId?: unknown | null) => unknown)
  | IdProviderConvertible<T>;

export type EdgesSourceData<T> = {
  data: T[];
  idProvider: IdProvider<T>;
  sourceIdProvider: ((dataItem: T) => unknown) | string;
  targetIdProvider: ((dataItem: T) => unknown) | string;
  edgeCreator?: EdgeCreator<unknown>;
};

export type NodesSourceData<T> = {
  data: T[];
  idProvider: IdProvider<T>;
  parentIdProvider?: ((dataItem: T) => unknown) | string;
  nodeCreator?: NodeCreator<unknown>;
};

export type NodeCreatorConfiguration<T> = {
  template?: string;
  tagProvider?: ((dataItem: T) => unknown) | null;
  isGroupProvider?: ((dataItem: T) => boolean) | null;
  layout?: ((dataItem: T) => Rect | RectConvertible) | null;
  x?: ((dataItem: T) => number) | null;
  y?: ((dataItem: T) => number) | null;
  width?: ((dataItem: T) => number) | null;
  height?: ((dataItem: T) => number) | null;
  styleProvider: NodeStyle;
  fill?: ((dataItem: T) => Fill | FillConvertible) | null;
  shape?: ((dataItem: T) => ShapeNodeShape | ShapeNodeShapeStringValues) | null;
  stroke?: ((dataItem: T) => Stroke | StrokeConvertible) | null;
  tabFill?: ((dataItem: T) => Fill | FillConvertible) | null;
  tabBackgroundFill?: ((dataItem: T) => Fill | FillConvertible) | null;
  image?: ((dataItem: T) => string | null | undefined) | null;
};

export type NodeStyle =
  | "ShapeNodeStyle"
  | "ImageNodeStyle"
  | "TemplateNodeStyle"
  | "VueJSNodeStyle"
  | "GroupNodeStyle"
  | "ReactHtmlNodeStyle";

export type EdgesSourceDataConfiguration<T> = {
  idProvider?: IdProvider<T>;
  sourceIdProvider?: ((dataItem: T) => unknown) | string;
  targetIdProvider?: ((dataItem: T) => unknown) | string;
};

export function buildEdgesSourceData<T = unknown>(
  state: { data: T[]; edgeCreator?: EdgeCreator<unknown> },
  configuration: EdgesSourceDataConfiguration<T>
): EdgesSourceData<T> {
  return {
    data: state.data,
    idProvider: configuration.idProvider!,
    sourceIdProvider: configuration.sourceIdProvider!,
    targetIdProvider: configuration.targetIdProvider!,
    edgeCreator: state.edgeCreator,
  };
}

export type NodesSourceDataConfiguration<T = unknown> = {
  idProvider?: IdProvider<T> | null;
  parentIdProvider?: ((dataItem: T) => unknown) | string;
};

export function buildNodesSourceData<T = unknown>(
  state: { data: T[]; nodeCreator?: NodeCreator<unknown> },
  configuration: NodesSourceDataConfiguration<T>
): NodesSourceData<T> {
  return {
    data: state.data,
    idProvider: configuration.idProvider!,
    parentIdProvider: configuration.parentIdProvider!,
    nodeCreator: state.nodeCreator,
  };
}

export function createLabelCreator<T = unknown>(
  labelConfiguration: LabelConfiguration<T>,
  nodes: boolean
): LabelCreator<T> {
  const creator = new LabelCreator<T>();
  configureLabelCreator(
    labelConfiguration,
    creator,
    nodes,
    nodes ? asLayoutParameterForNodes : asLayoutParameterForEdges
  );
  return creator;
}

export function buildNodeCreator<T = unknown>(
  labelConfigurations: LabelConfiguration<unknown>[] | undefined,
  configuration: NodeCreatorConfiguration<T>
): NodeCreator<T> {
  const nodeCreator = newConfiguredNodeCreator<T>();

  if (configuration.styleProvider === "ImageNodeStyle") {
    nodeCreator.styleProvider = (item: unknown) => {
      return new ImageNodeStyle({ image: configuration.image!(item as T) });
    };
  } else if (configuration.styleProvider === "ShapeNodeStyle") {
    maybeAddBinding(
      nodeCreator.styleBindings,
      "fill",
      makeEmptyValueNull(configuration.fill)
    );
    maybeAddBinding(
      nodeCreator.styleBindings,
      "stroke",
      makeEmptyValueNull(configuration.stroke)
    );

    const shapeBinding = configuration.shape;
    if (shapeBinding) {
      nodeCreator.styleProvider = (item: unknown) => {
        return new ShapeNodeStyle({
          shape: shapeBinding(item as T),
          stroke: null,
          fill: null,
        });
      };
    }
  } else if (configuration.styleProvider === "VueJSNodeStyle") {
    const vuejsNodeStyle = null;
    nodeCreator.styleProvider = () => vuejsNodeStyle;
  } else if (configuration.styleProvider === "TemplateNodeStyle") {
    const stringTemplateNodeStyle = new StringTemplateNodeStyle({
      svgContent: configuration.template || "<g/>",
    });
    nodeCreator.styleProvider = () => stringTemplateNodeStyle;
  } else if (configuration.styleProvider === "GroupNodeStyle") {
    maybeAddBinding(
      nodeCreator.styleBindings,
      "contentAreaFill",
      makeEmptyValueNull(configuration.fill)
    );
    maybeAddBinding(
      nodeCreator.styleBindings,
      "stroke",
      makeEmptyValueNull(configuration.stroke)
    );
    maybeAddBinding(
      nodeCreator.styleBindings,
      "tabFill",
      makeEmptyValueNull(configuration.tabFill)
    );

    nodeCreator.styleProvider = () => {
      return new GroupNodeStyle({
        tabPosition: GroupNodeStyleTabPosition.TOP,
        stroke: "black",
        contentAreaFill: null,
        tabFill: "black",
        contentAreaInsets: 10,
      });
    };
  }
  else if (configuration.styleProvider === 'ReactHtmlNodeStyle') {
    const jsx = createReactRenderFunction(
      configuration.template || '<div></div>'
    )
    const reactNodeStyle = createReactComponentHtmlNodeStyleFromJSX(jsx)
    nodeCreator.styleProvider = () => reactNodeStyle
  }

  if (configuration.layout) {
    nodeCreator.layoutProvider = configuration.layout;
  }
  maybeAddBinding(nodeCreator.layoutBindings, "x", configuration.x);
  maybeAddBinding(nodeCreator.layoutBindings, "y", configuration.y);
  maybeAddBinding(nodeCreator.layoutBindings, "width", configuration.width);
  maybeAddBinding(nodeCreator.layoutBindings, "height", configuration.height);

  if (configuration.tagProvider) {
    nodeCreator.tagProvider = configuration.tagProvider;
  }

  if (configuration.isGroupProvider) {
    nodeCreator.isGroupPredicate = configuration.isGroupProvider;
  }

  if (labelConfigurations) {
    applyLabelConfiguration(
      labelConfigurations,
      nodeCreator,
      true,
      configuration.styleProvider === "GroupNodeStyle"
    );
  }

  return nodeCreator;
}

function makeEmptyValueNull<T>(
  binding:
    | ((dataItem: T) => Fill | FillConvertible | Stroke | StrokeConvertible)
    | null
    | undefined
) {
  return (dataItem: T) => {
    if (!binding) {
      return null;
    }
    const result = binding(dataItem);
    if (typeof result === "string" && result.trim().length === 0) {
      return null;
    }
    return result;
  };
}

/**
 * Wrap the user's JSX in a render function such that the user does not need to explicitly define the arrow function
 * but just the template.
 */
function createReactRenderFunction(userJsx: string): string {
  return `({width, height, detail, selected, tag}) => (<>${userJsx}</>)`
}

function applyLabelConfiguration<T>(
  labelConfigurations: LabelConfiguration<unknown>[],
  creator: EdgeCreator<T> | NodeCreator<T>,
  nodes: boolean,
  groupNodes: boolean = false
) {
  for (const labelConfiguration of labelConfigurations) {
    let labelCreator: LabelCreator<unknown>;
    const labelsBinding = labelConfiguration.labelsBinding;
    const textBinding = labelConfiguration.textBinding;
    if (textBinding) {
      if (labelsBinding) {
        labelCreator = creator.createLabelsSource({
          data: labelsBinding as unknown as string,
          text: textBinding,
        }).labelCreator;
      } else {
        labelCreator = creator.createLabelBinding(textBinding) as LabelCreator<unknown>;
      }
      configureLabelCreator(
        labelConfiguration,
        labelCreator,
        nodes,
        nodes
          ? groupNodes
            ? asLayoutParameterForGroupNodes
            : asLayoutParameterForNodes
          : asLayoutParameterForEdges
      );
    }
  }
}

function getArrow(
  arrowBinding: ((dataItem: unknown) => unknown) | null | undefined,
  item: unknown
): ArrowType {
  return arrowBinding ? (arrowBinding(item) as ArrowType) : ArrowType.NONE;
}

function getStroke(
  binding: ((dataItem: unknown) => string | null | undefined) | null | undefined,
  item: unknown
): Stroke | null {
  if (binding) {
    const strokeString = binding(item);
    if (strokeString) {
      return Stroke.from(strokeString);
    }
  }
  return null;
}

function createArrow(
  arrowBinding: ((dataItem: unknown) => unknown) | null | undefined,
  strokeBinding: ((dataItem: unknown) => unknown) | null | undefined,
  item: unknown
): Arrow {
  const stroke = getStroke(strokeBinding as ((dataItem: unknown) => string | null | undefined) | null | undefined, item);
  return new Arrow({
    type: getArrow(arrowBinding, item),
    fill: stroke ? stroke.fill : null,
    stroke: stroke
      ? new Stroke({ fill: stroke.fill, lineCap: "square" })
      : null,
    scale: stroke ? stroke.thickness : 1,
  });
}

export type EdgeCreatorConfiguration<T> = {
  tagProvider?: (dataItem: T) => unknown;
  stroke?: (dataItem: T) => Stroke | StrokeConvertible;
  sourceArrow?: (dataItem: T) => string;
  targetArrow?: (dataItem: T) => string;
  bendsProvider?:
  | ((
    dataItem: T
  ) =>
    | Point[]
    | PointConvertible[]
    | Iterable<Point | PointConvertible>
    | (() => GeneratorLike<Point | PointConvertible>)
    | null
    | undefined)
  | null;
};

export function buildEdgeCreator<T = unknown>(
  labelConfigurations: LabelConfiguration<unknown>[] | undefined,
  layoutControll: LayoutControll,
  configuration: EdgeCreatorConfiguration<T>
): EdgeCreator<unknown> {
  const edgeCreator = newConfiguredEdgeCreator<T>();

  const edgeDefaults = edgeCreator.defaults;
  edgeDefaults.shareStyleInstance = true;

  if (configuration.tagProvider) {
    edgeCreator.tagProvider = configuration.tagProvider;
  }

  maybeAddBinding(
    edgeCreator.styleBindings,
    "stroke",
    makeEmptyValueNull(configuration.stroke)
  );
  

  maybeAddBinding(edgeCreator.styleBindings, "sourceArrow", (item: T) =>
    createArrow(
      configuration.sourceArrow as ((dataItem: unknown) => unknown) | null | undefined,
      makeEmptyValueNull(configuration.stroke) as ((dataItem: unknown) => unknown) | null | undefined,
      item
    )
  );
  maybeAddBinding(edgeCreator.styleBindings, "targetArrow", (item: T) =>
    createArrow(
      configuration.targetArrow as ((dataItem: unknown) => unknown) | null | undefined,
      makeEmptyValueNull(configuration.stroke) as ((dataItem: unknown) => unknown) | null | undefined,
      item
    )
  );

  edgeCreator.styleProvider = SetPreset(layoutControll.preset);

  if (configuration.bendsProvider) {
    edgeCreator.bendsProvider = configuration.bendsProvider;
  }

  if (labelConfigurations) {
    applyLabelConfiguration(labelConfigurations, edgeCreator, false);
  }

  return edgeCreator as EdgeCreator<unknown>;
}

export function SetPreset(preset: string=GraphPreset.polyline,stroke?: string,targetArrow?:string) {

  switch (preset) {
    case GraphPreset.polyline:
      return () => {
        return new PolylineEdgeStyle({
          stroke: stroke ?? null,
          sourceArrow: IArrow.NONE,
          targetArrow: targetArrow ?? IArrow.NONE,
          smoothingLength: 10,
        });
      };

    case GraphPreset.arc:
      return () => {
        return new ArcEdgeStyle({
          stroke: stroke ?? null,
          sourceArrow: IArrow.NONE,
          targetArrow: targetArrow ?? IArrow.NONE,
        });
      };

    case GraphPreset.bezier:
      return () => {
        return new BezierEdgeStyle({
          stroke: stroke ?? null,
          sourceArrow: IArrow.NONE,
          targetArrow: targetArrow ?? IArrow.NONE,
        });
      };

    default:
      return () => {
        return new PolylineEdgeStyle({
          stroke: stroke ?? null,
          sourceArrow: IArrow.NONE,
          targetArrow: targetArrow ?? IArrow.NONE,
          smoothingLength: 10,
        });
      };
  }

}

export function buildLabelConfiguration<T = unknown>(
  configuration: LabelConfiguration<T>
): LabelConfiguration<T> {
  return {
    labelsBinding: configuration.labelsBinding,
    textBinding: configuration.textBinding,
    placement: configuration.placement,
    fill: configuration.fill,
  };
}

export function buildGraph(state: {
  nodesSources: NodesSourceData<unknown>[];
  edgesSources?: EdgesSourceData<unknown>[];
}): IGraph {
  const builder = new GraphBuilder();

  for (const src of state.nodesSources) {
    if (!src.data) {
      continue;
    }

    const nodesSource = builder.createNodesSource({
      data: src.data,
      id: src.idProvider,
      parentId: src.parentIdProvider,
    });
    nodesSource.nodeCreator = src.nodeCreator
      ? src.nodeCreator
      : newConfiguredNodeCreator();
  }

  for (const src of state.edgesSources || []) {
    if (!src.data) {
      continue;
    }

    const edgesSource = builder.createEdgesSource(
      src.data,
      src.sourceIdProvider,
      src.targetIdProvider,
      src.idProvider || null
    );
    edgesSource.edgeCreator = src.edgeCreator
      ? src.edgeCreator
      : newConfiguredEdgeCreator();
  }

  builder.updateGraph();
  return builder.graph;
}

function newConfiguredNodeCreator<T>(): NodeCreator<T> {
  const nodeCreator = new NodeCreator<T>();
  const nodeDefaults = nodeCreator.defaults;
  nodeDefaults.style = new ShapeNodeStyle({
    shape: "round-rectangle",
    fill: "#eee",
    stroke: "#323232",
  });
  (
    nodeDefaults.style.renderer as ShapeNodeStyleRenderer
  ).roundRectArcRadius = 3;
  nodeDefaults.shareStyleInstance = false;
  nodeDefaults.size = new Size(60, 30);

  const labelDefaults = nodeDefaults.labels;
  labelDefaults.style = new DefaultLabelStyle({
    textSize: 14,
    textFill: "black",
  });
  labelDefaults.shareStyleInstance = true;
  labelDefaults.layoutParameter = InteriorLabelModel.SOUTH;
  return nodeCreator;
}

function newConfiguredEdgeCreator<T>(): EdgeCreator<T> {
  const edgeCreator = new EdgeCreator<T>();
  const edgeDefaults = edgeCreator.defaults;
  edgeDefaults.style = new PolylineEdgeStyle({
    stroke: "#eee",
    smoothingLength: 5,
    targetArrow: "#eee medium triangle",
  });
  edgeDefaults.shareStyleInstance = false;

  const labelDefaults = edgeDefaults.labels;
  labelDefaults.style = new DefaultLabelStyle({
    textSize: 12,
    textFill: "#eee",
  });
  labelDefaults.shareStyleInstance = false;
  labelDefaults.layoutParameter = new EdgePathLabelModel({
    autoRotation: false,
  }).createRatioParameter();
  return edgeCreator;
}
