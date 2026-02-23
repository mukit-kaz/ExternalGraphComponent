import { BusinessType } from "./../../constants/entityConstants";
import { orgchartActions } from "../../stores/slices/orgchartSlice";
import {
  CompanyGraphMode,
  EdgeType,
  LayoutControll,
  NodeType,
} from "../../graph/type/type";
import { appStore } from "../../stores/redux-store";
import {
  FilterType,
  FilterWithOption,
} from "../../graph/filter/graphFilterComponent";
import { FilterNodeAndEdge } from "../../graph/filter/filter";
import { OwnerShip } from "../../types/entity-types";
import { FilterApi } from "../../apis/FilterApi";
import { GraphPreset, Shape, ViewMode } from "../../graph/type/constant";
import { GraphFilterType } from "../../enums/graph-filter-type-enums";
import { ChartControlApi } from "../../apis/companyData/ChartControlApi";
import toast from "react-hot-toast";

export class GraphControlUtils {
  static UpdateGraph() {
    const entities = appStore.getState().entity.ownerships;

    const entityList = new Set<NodeType>();
    const edgeList = new Set<EdgeType>();
    const uniqueEntityIds = new Set<string>();

    GraphControlUtils.MapIntoGraph(
      entities,
      uniqueEntityIds,
      entityList,
      edgeList
    );

    const entityArray = Array.from(entityList);
    const edgeArray = Array.from(edgeList);

    appStore.dispatch(
      orgchartActions.UpdateGraph({ node: entityArray, edge: edgeArray })
    );

    if (appStore.getState().graph.filterId) GraphControlUtils.GraphFilterd();
  }

  static UpdateGraphWithHeatAmount(heatmap:Record<string,string>){
    // featch exising graph node then map with heatmap
    const graph = appStore.getState().graph.graph;
    const filteredNode = graph.nodes.map((node) => {
      const heatAmount = heatmap[node?.taxResidenceJurisdiction?.toLowerCase()] || "0.3";
      return {
        ...node,
        heatAmount: parseFloat(heatAmount),
      };
    });

    appStore.dispatch(
      orgchartActions.UpdateGraphNode({ node: filteredNode })
    );
  }

  private static MapIntoGraph(
    entities: OwnerShip[],
    uniqueEntityIds: Set<string>,
    entityList: Set<NodeType>,
    edgeList: Set<EdgeType>
  ) {
    const nodes = appStore.getState().entity.entities;

    entities.forEach((entity) => {
      // Check if the entity's ID is already in the Set
      if (!uniqueEntityIds.has(entity.ownedId)) {
        // Add the entity's ID to the Set to mark it as seen
        uniqueEntityIds.add(entity.ownedId);

        // Add the entity to the entityList
        const node = nodes.find((node) => node.entityId === entity.ownedId);
        entityList.add({
          id: entity.ownedId,
          name: entity.ownedName,
          filterd: false,

          businessType: node?.businessType,
          databaseId: node?.databaseId,
          entityCode: node?.entityCode,
          incorporationJurisdiction: node?.incorporationJurisdiction,
          sicCode: node?.sicCode,
          subNational: node?.subNational,
          taxCharList: node?.taxCharList,
          taxResidenceJurisdiction: node?.taxResidenceJurisdiction,
        });
      }

      const self = entity.ownerName?.trim().toLowerCase();
      if (
        self === "" ||
        self === "parent" ||
        self === entity.ownedName?.trim().toLowerCase()
      )
        return;

      // Check if the entity's ID is already in the Set
      if (!uniqueEntityIds.has(entity.ownerId)) {
        // Add the entity's ID to the Set to mark it as seen
        uniqueEntityIds.add(entity.ownerId);

        // Add the entity to the entityList
        const node = nodes.find((node) => node.entityId === entity.ownerId);

        entityList.add({
          id: entity.ownerId,
          name: entity.ownerName,
          filterd: false,

          businessType: node?.businessType,
          databaseId: node?.databaseId,
          entityCode: node?.entityCode,
          incorporationJurisdiction: node?.incorporationJurisdiction,
          sicCode: node?.sicCode,
          subNational: node?.subNational,
          taxCharList: node?.taxCharList,
          taxResidenceJurisdiction: node?.taxResidenceJurisdiction,
        });
      }

      // edge add
      edgeList.add({
        id: entity.ownerId + entity.ownedId,
        fromNode: entity.ownerId,
        toNode: entity.ownedId,
        percentage: entity.ownershipPercentage,
        filterd: false,
      });
    });
  }

  static HasGraph() {
    const entities = appStore.getState().entity.ownerships;

    return entities.length > 0;
  }

  static AboutGraph() {
    const chart = appStore.getState().chart;
    return (
      chart.chartList.find((x) => x.chartId === chart.selectedChartId)
        ?.chartName ?? "Organizational Chart"
    );
  }

  static GraphEntities() {
    return appStore.getState().graph.graph.nodes;
  }

  static GraphFilterd() {
    const nodes = appStore.getState().graph.graph;

    // Create new arrays with copied objects
    const filteredNode = nodes.nodes.map((node) => ({ ...node }));
    const filteredEdge = nodes.edges.map((edge) => ({ ...edge }));

    GraphControlUtils.ResetFilter(filteredNode, filteredEdge);

    const filters = GraphControlUtils.GetSelectedGraphFilter();

    const ownershipList = filters.filters.filter(
      (x) => x.type === GraphFilterType.OwnershipPercentage
    );
    const othersList = filters.filters.filter(
      (x) => x.type !== GraphFilterType.OwnershipPercentage
    );

    FilterNodeAndEdge(
      [...othersList, ...ownershipList],
      filteredEdge,
      filteredNode
    );

    appStore.dispatch(
      orgchartActions.UpdateGraph({ node: filteredNode, edge: filteredEdge })
    );
  }

  static GetSelectedGraphFilter() {
    const graph = appStore.getState().graph;

    const numericValue = parseFloat(graph.filterId ?? "");
    const filter = isNaN(numericValue)
      ? graph.filter
      : graph.filterOptions?.find((x) => x.option.value === graph.filterId)
          ?.filters;

    appStore.dispatch(
      orgchartActions.ReplaceFilter({
        filterId: graph.filterId,
        filter: filter ?? [],
      })
    );

    return {
      filterId: graph.filterId,
      filters: filter,
    };
  }

  static SetGraphFilter(filters: FilterType[], filterId?: string) {
    appStore.dispatch(
      orgchartActions.ReplaceFilter({ filterId: filterId, filter: filters })
    );

    GraphControlUtils.GraphFilterd();
  }

  static ResetFilter(
    filteredNode: NodeType[],
    filteredEdge: EdgeType[],
    force: boolean = false
  ) {
    filteredEdge.forEach((x) => (x.filterd = false));
    filteredNode.forEach((x) => (x.filterd = false));

    if (force) {
      appStore.dispatch(
        orgchartActions.ReplaceFilter({ filterId: "", filter: [] })
      );
      appStore.dispatch(
        orgchartActions.UpdateGraph({ node: filteredNode, edge: filteredEdge })
      );
    }
  }

  static ResetLayout() {
    appStore.dispatch(orgchartActions.ResetLayout());
  }

  static async UpgradeFilterOption() {
    if (Number(appStore.getState().chart.selectedChartId) === 0) return;

    const response = await FilterApi.getFilterListByChart(
      Number(appStore.getState().chart.selectedChartId)
    ).then((res) => {
      return res.data.map(
        (item) =>
          ({
            option: {
              value: item.Option.Value,
              label: item.Option.Label,
              CreatedDateTime: item.Option.CreatedDateTime,
            },
            filters: item.Filters.map((filter) => ({
              id: filter.Id,
              entity: filter.Entity,
              logic: filter.Logic,
              value: filter.Value,
              type: filter.Type,
            })),
          } as FilterWithOption)
      );
    });

    appStore.dispatch(orgchartActions.SetFilterOptions({ options: response }));
  }

  static SyncGraphFilter = async (isSyncOnline: boolean = false) => {
    if (isSyncOnline) {
      await GraphControlUtils.UpgradeFilterOption();
    }

    const graph = appStore.getState().graph.graph;
    // Create new arrays with copied objects
    const filteredNode = graph.nodes.map((node) => ({ ...node }));
    const filteredEdge = graph.edges.map((edge) => ({ ...edge }));
    GraphControlUtils.ResetFilter(filteredNode, filteredEdge, true);
    GraphControlUtils.GraphFilterd();
  };

  static ResetLayoutControll() {
    appStore.dispatch(orgchartActions.ResetControll());
  }
  static UpdateLayoutControll(controll: LayoutControll) {
    const control = appStore.getState().graph.controll;
    appStore.dispatch(
      orgchartActions.UpdateControll({ ...control, ...controll })
    );
  }
  static async SwitchGraphViewControll(view: string) {
    const viewType = await ChartControlApi.saveControlView(view);
    const control = appStore.getState().graph.controll;
    appStore.dispatch(
      orgchartActions.UpdateControll({
        ...control,
        view: viewType?.data.ViewType,
      })
    );
  }
  static SetGraphViewTemporary(view?: string) {
    const control = appStore.getState().graph.controll;
    appStore.dispatch(
      orgchartActions.UpdateControll({
        ...control,
        view: view ?? ViewMode.Shape,
      })
    );
  }
  static async SwitchGraphMode(mode?: string) {
    const control = appStore.getState().graph.controll;
    appStore.dispatch(
      orgchartActions.UpdateControll({
        ...control,
        mode: mode ?? CompanyGraphMode.Entity,
      })
    );
  }

  static async SwitchGraphLayout(layout: string) {
    appStore.dispatch(orgchartActions.onGraphLayoutChange(layout));
  }

  static GetChartControlUtil() {
    return ChartControlApi.getChartControl().then((x) => x.data);
  }

  static SaveControlView(view: string) {
    let viewType;
    ChartControlApi.saveControlView(view).then((x) => (viewType = x.data));
    return viewType;
  }

  static async AddChartControlUtil(
    controll: LayoutControll
  ): Promise<LayoutControll> {
    try {
      const response = await ChartControlApi.addChartControl(controll);
      const insertedData: LayoutControll = response.data;

      return insertedData;
    } catch (error) {
      toast.error(error.response.data.Message ?? "Error adding chart control");
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
  }

  static CommonLayoutControll() {
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
}
