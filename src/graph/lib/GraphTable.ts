import { CalculateShapeHeight, CalculateShapeWidth } from "../../utils/graph-utils/chart-utils";
import { Shape } from "../type/constant";
import { LayoutControll } from "../type/type";
import {
  NodeCreatorConfiguration,
  buildNodeCreator,
} from "./GraphBuilder";
import { ShapeFilterdViewUi, ShapeViewUi, TableViewUi } from "./ViewUi";


export const TableNodeCreator = async (data,control: LayoutControll,isfilter:boolean=false) => {
  return await buildNodeCreator(
    [],
    GetTableNodeConfiguration(isfilter, control, data)
  );
};

export const ShapeNodeCreator = async (data,control: LayoutControll,isfiltered: boolean=false) => {
  return await buildNodeCreator([], 
    GetShapeNodeConfiguration(data, control,isfiltered)
  );
};



function GetTableNodeConfiguration(isfilter: boolean, control: LayoutControll, data: any): NodeCreatorConfiguration<any> {
  return {
    x: () => 0,
    y: () => 0,
    width: () => 203,
    height: () => 100,
    styleProvider: "ReactHtmlNodeStyle",
    template: TableViewUi(isfilter ? control.tableBodyHighlightColor : control.tableBodyColor),
    tagProvider: (item) => {
      const node = data.nodes.find((node) => node.id === item.id);
      let color = control.tableColors.find((shape) => shape.key === node?.businessType);
      if (!color)
        color = control.tableColors.find(
          (shape) => shape.key === Shape.Default
        );
      return { ...node, ...color };
    },
  };
}

function GetShapeNodeConfiguration(data: any, control: LayoutControll,isfiltered:boolean): NodeCreatorConfiguration<any> {
  return {
    x: () => 0,
    y: () => 0,
    width: (item) => {
      return GetWidth(data, item, control);
    },
    height: (item) => {
      return GetHeight(data, item, control);
    },
    styleProvider: "ReactHtmlNodeStyle",
    template: isfiltered?ShapeFilterdViewUi(control.shapeColorHighlight):ShapeViewUi(),
    tagProvider: (item) => {
      return GetTagForShape(data, item, control);
    },
  };
}

function GetTagForShape(data: any, item: any, control: LayoutControll) {
  const node = data.nodes.find((node) => node.id === item.id);
  let shape = control?.typeShapes?.find((shape) => shape.key === node?.businessType);
  let color = control?.shapeColors?.find((shape) => shape.key === node?.businessType);

  if (!shape)
    shape = control?.typeShapes?.find(
      (shape) => shape.key === Shape.Default
    );

  if (!color)
    color = control?.shapeColors?.find(
      (shape) => shape.key === Shape.Default
    );
  return { ...node, ...shape, ...color };
}

function GetShapeOfNode(data: any, item: any, control: LayoutControll) {
  const node = data.nodes.find((node) => node.id === item.id);
  let shape = control?.typeShapes?.find((shape) => shape.key === node?.businessType);
  if (!shape)
    shape = control?.typeShapes?.find(
      (shape) => shape.key === Shape.Default
    );
  return shape;
}

function GetWidth(data: any, item: any, control: LayoutControll) {
  const shape = GetShapeOfNode(data, item, control);

  return CalculateShapeWidth(shape?.shape);
}

function GetHeight(data: any, item: any, control: LayoutControll) {
  const shape = GetShapeOfNode(data, item, control);

  return CalculateShapeHeight(shape?.shape);
}
