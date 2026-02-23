import type { LayoutControll } from "../types/type";
import { GraphPreset, Shape, ViewMode } from "../types/constant";
import { BusinessType } from "../constants/entityConstants";

/**
 * Returns the default layout configuration for the standalone graph viewer.
 * This configuration includes all the visual properties, colors, and layout settings.
 */
export function getDefaultLayoutControll(): LayoutControll {
  const controll: LayoutControll = {
    integratedEdgeLabeling: true,
    automaticEdgeGrouping: false,
    labelingEnabled: true,
    nodeToNodeDistance: 150,
    minimumLayerDistance: 150,
    edgeToEdgeDistance: 75,
    nodeToEdgeDistance: 75,
    preferredEdgeLength: 150,
    minimumNodeDistance: 150,
    compactnessFactor: 0.5,
    preferredMinimumNodeToEdgeDistance: 100,
    gridSpacing: 40,
    nodeDistance: 150,
    preset: GraphPreset.polyline,

    view: ViewMode.Shape,

    typeShapes: [
      { key: Shape.Default, shape: Shape.Rectangle },
      { key: BusinessType.Ultimate_Parent_Entity, shape: Shape.Octagon },
      { key: BusinessType.Company, shape: Shape.Rectangle },
      { key: BusinessType.Branch_Site_Service_PE, shape: Shape.Circle_Dot },
      { key: BusinessType.Exempt_PE, shape: Shape.Pentagon },
      { key: BusinessType.Digital_PE, shape: Shape.Triangle },
      { key: BusinessType.Finance_Branch, shape: Shape.Hexagon },
      { key: BusinessType.Pass_Through_Entity, shape: Shape.Rhombus },
      { key: BusinessType.Trust_or_similar_body, shape: Shape.Rhombus_Dot },
    ],
    shapeColors: [
      {
        key: Shape.Default,
        value: {
          shapeBgColor: "#CF2979",
          shapeBorderColor: "#821A4C",
          shapeTextColor: "#fff",
        },
      },
      {
        key: BusinessType.Ultimate_Parent_Entity,
        value: {
          shapeBgColor: "#A0C4FF",
          shapeBorderColor: "#4E6C91",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Company,
        value: {
          shapeBgColor: "#B9E48C",
          shapeBorderColor: "#5F9F4E",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Branch_Site_Service_PE,
        value: {
          shapeBgColor: "#9D7CF0",
          shapeBorderColor: "#663399",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Exempt_PE,
        value: {
          shapeBgColor: "#D4A28F",
          shapeBorderColor: "#8C5B51",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Digital_PE,
        value: {
          shapeBgColor: "#FF6B6B",
          shapeBorderColor: "#D73838",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Finance_Branch,
        value: {
          shapeBgColor: "#2eff66",
          shapeBorderColor: "#0b3817",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Pass_Through_Entity,
        value: {
          shapeBgColor: "#64D8CB",
          shapeBorderColor: "#008080",
          shapeTextColor: "#000000",
        },
      },
      {
        key: BusinessType.Trust_or_similar_body,
        value: {
          shapeBgColor: "#ABB8B0",
          shapeBorderColor: "#2E4E3B",
          shapeTextColor: "#000000",
        },
      },
    ],
    shapeColorHighlight: {
      shapeBgColor: "#FFD166",
      shapeBorderColor: "#545c53",
      shapeTextColor: "#000000",
    },
    shapeEdgeColor: {
      shapeEdgeColor: "#75280F",
      shapeFilterdEdgeColor: "#FF5722",
    },

    tableColors: [
      { key: Shape.Default, value: { tableBorderColor: "#ff264e" } },
      {
        key: BusinessType.Ultimate_Parent_Entity,
        value: { tableBorderColor: "#4E6C91" },
      },
      { key: BusinessType.Company, value: { tableBorderColor: "#5F9F4E" } },
      {
        key: BusinessType.Branch_Site_Service_PE,
        value: { tableBorderColor: "#663399" },
      },
      { key: BusinessType.Exempt_PE, value: { tableBorderColor: "#8C5B51" } },
      {
        key: BusinessType.Digital_PE,
        value: { tableBorderColor: "#D73838" },
      },
      {
        key: BusinessType.Finance_Branch,
        value: { tableBorderColor: "#0b3817" },
      },
      {
        key: BusinessType.Pass_Through_Entity,
        value: { tableBorderColor: "#008080" },
      },
      {
        key: BusinessType.Trust_or_similar_body,
        value: { tableBorderColor: "#2E4E3B" },
      },
    ],
    tableBodyColor: {
      titleColor: "#3F6699",
      titleBgColor: "#F8F9FA",
      tableBgColor: "#F0F0F0",
      tableColTextColor: "#000000",
      tableTextColor: "#000000",
      tableBorderColor: "#A4AEB3",
    },
    tableBodyHighlightColor: {
      titleColor: "#292716",
      titleBgColor: "#fae3ac",
      tableBgColor: "#FFD166",
      tableColTextColor: "#000000",
      tableTextColor: "#000000",
      tableBorderColor: "#fae3ac",
    },
  };

  return controll;
}
