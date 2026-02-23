import { GetContrastColor } from "../../utils/extention/stringExtention";
import { ShapeCircle, ShapeHexagon, ShapePentagon, ShapeRectangle, ShapeRhombus, ShapeTriangle } from "../../utils/graph-utils/shape-utils";
import { Shape } from "../type/constant";
import { LayoutControll, ShapeColor, ShapeEdgeColor, TableBodyColor, TypeShape, TypeShapeColor, TypeTableColor } from "../type/type";

export function GenerateShapeLegend(contorl: LayoutControll) {
  let legend = '';

  legend += `<div style="text-align: center;"><h5>Chart Shape Legends</h5></div>`;
  legend += ShapeColorLegend(contorl);

  return legend;
}

function ShapeColorLegend(contorl: LayoutControll) {

  let typeColors = `<div style="display:flex; align-items: center;flex-wrap: wrap;">`;
  typeColors += contorl.shapeColors.map((type) => {
    return ShapeColorByType(type);
  });
  
  typeColors += ShapeColorHighlight(contorl.shapeColorHighlight);
  typeColors += '</div>';

  let edgeColors = '<div style="display:flex; align-items: center;flex-wrap: wrap;">';
  edgeColors += EdgeColor(contorl.shapeEdgeColor);
  edgeColors += '</div>';

  let shape = '<div style="display:flex; align-items: center;flex-wrap: wrap;">';
  shape += contorl.typeShapes.map((type) => {
    return ShapeByType(type);
  });
  shape += '</div>';

  let legend = `<div>`;
  legend += `
  <table>
    <tr>
        <td><strong>Business Type:</strong></td>
        <td>
        ${typeColors}
        </td>
    </tr>
    <tr>
        <td><strong>Edge:</strong></td>
        <td>${edgeColors}</td>
    </tr>
    <tr>
        <td><strong>Shape:</strong></td>
        <td>${shape}</td>
    </tr>
</table>
  `;

  return legend + '</div> <div style="page-break-after: always;"></div>';
}
// function ShapeColorLegend(contorl: LayoutControll) {
//   let legend = `<div>`;
//   legend += `
//   <table>
//     <tr>
//         <td>Type</td>
//         <td>Colors</td>
//     </tr>
//     <tr>
//         <td>Edge</td>
//         <td>colors</td>
//     </tr>
//     <tr>
//         <td>Shape</td>
//         <td>display</td>
//     </tr>
// </table>
//   `;
//   legend += `<div style="display:flex; align-items: center;flex-wrap: wrap;"><h5>Business Type Color: </h5>`;
//   legend += contorl.shapeColors.map((type) => {
//     return ShapeColorByType(type);
//   });
  
//   legend += ShapeColorHighlight(contorl.shapeColorHighlight);
//   legend += '</div>';
  
//   legend += '<div style="display:flex; align-items: center;flex-wrap: wrap;"><h5>Edge Color: </h5>';
//   legend += EdgeColor(contorl.shapeEdgeColor);
//   legend += '</div>';
  
//   legend += '<div style="display:flex; align-items: center;flex-wrap: wrap;"><h5>Shape: </h5>';
//   legend += contorl.typeShapes.map((type) => {
//     return ShapeByType(type);
//   });
//   legend += '</div>';

//   return legend + '</div> <div style="page-break-after: always;"></div>';
// }

function ShapeColorByType(type: TypeShapeColor) {
  return (`<div style="
      background-color: ${type.value.shapeBgColor};
      border: 2px solid ${type.value.shapeBorderColor};
      color: ${type.value.shapeTextColor};
      padding: 10px;
      margin: 5px;
      text-align: center;
      height: 10px;
      text-wrap: nowrap;
  ">
      <span style="color: ${type.value.shapeTextColor}; font-size:9px;">
          ${type?.key === "default" ? "Default" : type?.key}
      </span>
  </div>`);
}
function ShapeColorHighlight(type: ShapeColor) {
  return `,
  <div style="
      background-color: ${type.shapeBgColor};
      border: 2px solid ${type.shapeBorderColor};
      color: ${type.shapeTextColor};
      padding: 10px;
      margin: 5px;
      text-align: center;
      height: 10px;
      text-wrap: nowrap;
  ">
      <span style="color: ${type.shapeTextColor};  font-size:9px;">Filter Highlighter</span>
  </div>
`;
}
function EdgeColor(shapeEdgeColor: ShapeEdgeColor) {
  return (
    `
    <div style="
        background-color: ${shapeEdgeColor.shapeEdgeColor};
        color: ${GetContrastColor(shapeEdgeColor.shapeEdgeColor)};
        padding: 10px;
        margin: 5px;
        text-align: center;
        height: 10px;
        text-wrap: nowrap;  
    ">
        <span style="font-size:9px;">Default</span>
    </div>
    ,
    <div style="
        background-color: ${shapeEdgeColor.shapeFilterdEdgeColor};
        color: ${GetContrastColor(shapeEdgeColor.shapeFilterdEdgeColor)};
        padding: 10px;
        margin: 5px;
        text-align: center;
        height: 10px;
        text-wrap: nowrap;  
    ">
        <span style=" font-size:9px;">Filter</span>
    </div>
    `
  );
}

export function ShapeByType(
  type: TypeShape
) {
  const label = type.key==='default'?'Default':type.key;

  switch (type.shape) {
    case Shape.Rectangle:
      return ShapeRectangle(label);
    case Shape.Rectangle_Dot:
      return ShapeRectangle(label,"dotted");
    case Shape.Circle:
      return ShapeCircle(label);
    case Shape.Circle_Dot:
      return ShapeCircle(label,"dotted");
    case Shape.Rhombus:
      return ShapeRhombus(label);
    case Shape.Rhombus_Dot:
      return ShapeRhombus(label,"dotted");
    case Shape.Hexagon:
      return ShapeHexagon(label);
    case Shape.Pentagon:
      return ShapePentagon(label);
    case Shape.Triangle:
      return ShapeTriangle(label);
    
      case Shape.Default:
      return ShapeByType(type);
    
      default:
      return ShapePentagon(label);
  }
}


export function GenerateTableLegend(contorl: LayoutControll) {
  let legend = '';

  legend += `<div style="text-align: center;"><h5>Chart Table Legends</h5></div>`;
  legend += TableColorLegend(contorl);

  return legend;
}

function TableColorLegend(contorl: LayoutControll) {

  let typeColors = `<div style="display:flex; align-items: center;flex-wrap: wrap;">`;
  typeColors += contorl.tableColors.map((type) => {
    return TableColorByType(type);
  });
  typeColors += '</div>';
  
  let tableColors = '<div style="display:flex; align-items: center;flex-wrap: wrap;">';
  tableColors += TableBodyColorByType(contorl.tableBodyColor,contorl.tableBodyHighlightColor);
  tableColors += '</div>';

  let edgeColors = '<div style="display:flex; align-items: center;flex-wrap: wrap;">';
  edgeColors += EdgeColor(contorl.shapeEdgeColor);
  edgeColors += '</div>';

  let legend = `<div>`;
  legend += `
  <table>
    <tr>
        <td><strong>Business Type:</strong></td>
        <td>
        ${typeColors}
        </td>
    </tr>
    <tr>
        <td><strong>Table:</strong></td>
        <td>
        ${tableColors}
        </td>
    </tr>
    <tr>
        <td><strong>Edge:</strong></td>
        <td>${edgeColors}</td>
    </tr>
</table>
  `;

  return legend + '</div> <div style="page-break-after: always;"></div>';
}

function TableColorByType(type: TypeTableColor) {
  return (`<div style="
      background-color: ${type.value.tableBorderColor};
      color: ${GetContrastColor(type.value.tableBorderColor)};
      padding: 10px;
      margin: 5px;
      text-align: center;
      height: 10px;
      text-wrap: nowrap;
  ">
      <span style="font-size:9px;">
          ${type?.key === "default" ? "Default" : type?.key}
      </span>
  </div>`);
}

function TableBodyColorByType(type: TableBodyColor,filter:TableBodyColor) {
  return (`
  <div style="
      background-color: ${type.tableBgColor};
      border: 2px solid ${type.tableBorderColor};
      color: ${type.tableTextColor};
      padding: 10px;
      margin: 5px;
      text-align: center;
      height: 10px;
      text-wrap: nowrap;
  ">
      <span style="font-size:9px;">
          Default
      </span>
  </div>
  ,
  <div style="
      background-color: ${filter.tableBgColor};
      border: 2px solid ${filter.tableBorderColor};
      color: ${filter.tableTextColor};
      padding: 10px;
      margin: 5px;
      text-align: center;
      height: 10px;
      text-wrap: nowrap;
  ">
      <span style="font-size:9px;">
          Filter
      </span>
  </div>
  `);
}