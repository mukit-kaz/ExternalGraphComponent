import { GraphComponent } from "@yfiles/yfiles";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { shallowEqual, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CollapseIcon from "../assets/icons/CollapseIcon";
import { EntitiesSideNavbar } from "../components/entities/EntitiesSideNavbar";
import { getCompanydataChartId } from "../helpers/companydataHelper";
import { AppRoutesUI } from "../routes/appRoutes";
import { useAppSelector } from "../stores/redux-store";
import { orgchartActions } from "../stores/slices/orgchartSlice";
import { ChartControlUtils } from "../utils/chart-utils/ChartControlUtils";
import { EntityControlUtils } from "../utils/entity-utils/entity-control-utils";
import { GraphControlUtils } from "../utils/graph-utils/graph-control-utils";
import { GraphComponentContext } from "./lib/GraphComponentContext";
import "./OrgchartComponent.scss";
import { Graph_Layout } from "./type/constant";

const ReactGraphComponent = lazy(
  () => import("./components/ReactGraphComponent")
);
// const ChartDropdownComponent = lazy(
//   () => import("../components/ChartDropdownComponent")
// );
const OrgchartSideNavLeft = lazy(() => import("./OrgchartSideNavLeft"));
const OrgchartSideNavRight = lazy(() => import("./OrgchartSideNavRight"));
const ReactGraphOverviewComponent = lazy(
  () => import("./components/GraphOverviewComponent")
);
const Toolbar = lazy(() => import("./components/Toolbar"));

function OrgchartComponent() {
  // const chartId = getCompanydataChartId();

  const graphComponentState = useState<GraphComponent | null>(null);
  // const [tittle, setTittle] = useState<string>("Organizational Chart");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isFiltered = useAppSelector(
    (store) => store.graph.filter?.length > 0,
    shallowEqual
  );

  const selectedChartId = useAppSelector(
    (store) => store.chart.selectedChartId,
    shallowEqual
  );
  const chartList = useAppSelector(
    (state) => state.chart.chartList,
    shallowEqual
  );

  const setChartInfo = useCallback(() => {
    const chartId = getCompanydataChartId();

    const selectedChart = chartId
      ? chartList.find((chart) => chart.chartId === chartId)
      : chartList[0];

    if (selectedChart) {
      ChartControlUtils.setSelectedChartId(selectedChart.chartId);
    }
  }, [chartList]);

  const loadGraph = useCallback(async () => {
    await GraphControlUtils.SwitchGraphMode();

    if (!GraphControlUtils.HasGraph())
      navigate(AppRoutesUI.CompanyData.Entities.EntityInformation.Data.Path());

    await GraphControlUtils.UpgradeFilterOption();
    // setTittle(GraphControlUtils.AboutGraph());
    await EntityControlUtils.SetSelectedEntityIntoGraph(null);

    await GraphControlUtils.GetChartControlUtil().then((res) => {
      GraphControlUtils.UpdateLayoutControll(res);
    });

    GraphControlUtils.UpdateGraph();
  }, [navigate]);

  const loadData = useCallback(
    async (chartId: string) => {
      if (!chartId || chartId === "00") return;
      try {
        setIsLoading(true);
        await EntityControlUtils.getEntitiesAndOwnershisByChartId(chartId);
        await loadGraph();
      } finally {
        setIsLoading(false);
      }
    },
    [loadGraph]
  );

  useEffect(() => {
    const chartId = getCompanydataChartId();

    if (!chartId && selectedChartId === "00") return;

    setChartInfo();

    loadData(chartId);
  }, [loadData, selectedChartId, setChartInfo]);

  useEffect(() => {
    // Initially set the layout to hierarchical
    dispatch(orgchartActions.onGraphLayoutChange(Graph_Layout.Hierarchic));
  }, [dispatch]);

  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const layout = event.target.value;
    dispatch(orgchartActions.onGraphLayoutChange(layout));
    dispatch(orgchartActions.onGraphOrientationChange(""));
  };

  const handleOrientationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const orientation = event.target.value;
    dispatch(orgchartActions.onGraphOrientationChange(orientation));
  };

  const onResetFilter = () => {
    GraphControlUtils.SyncGraphFilter();
  };

  return (
    <section className="bg-reg-white flex px-3 pt-3 w-full h-[calc(100vh-4rem)] overflow-hidden">
      <EntitiesSideNavbar expanded={expanded} setExpanded={setExpanded} />
      <GraphComponentContext.Provider value={graphComponentState}>
        <div className="flex flex-col w-full">
          <div
            className={`w-full ${
              expanded ? "rounded-tr-md" : "rounded-t-md"
            } h-16 border bg-reg-gray-100-0.55 border-reg-gray-200 flex items-center px-4 z-10`}
          >
            {!expanded && (
              <button
                className="reg-icon-button reg-button-transparent w-8 h-8"
                onClick={() => setExpanded(!expanded)}
              >
                <CollapseIcon
                  className={`w-5 h-5 transform text-reg-gray-500 ${
                    expanded ? "rotate-0" : "rotate-180"
                  }`}
                />
              </button>
            )}
            <div className="flex items-center pl-3">
              <p className="text-reg-gray-900 text-16-semibold xl:text-18-semibold pr-2">
                Visual Entity Chart
              </p>
              {isFiltered && (
                <div className="reg-chip-button-filter chip-button-small">
                  Filtered
                  <button
                    className="reg-chip-button-close chip-button-close-small"
                    onClick={onResetFilter}
                  >
                      <CgClose />
                  </button>
                </div>
              )}
            </div>
            <div className="ml-auto">
              <Suspense>
                <Toolbar />
              </Suspense>
            </div>
          </div>

          <div className="w-full flex h-[calc(100vh-4rem)]">
            <div className="flex-shrink-0 relative z-[2]">
              <Suspense>
                <OrgchartSideNavLeft />
              </Suspense>
            </div>

            <div className="flex-1 relative h-full">
              {!isLoading && (
                <>
                  <Suspense>
                    <ReactGraphComponent />
                  </Suspense>
                  <div className="absolute left-16 bottom-16 z-1">
                    <Suspense>
                      <ReactGraphOverviewComponent />
                    </Suspense>
                  </div>
                </>
              )}
            </div>

            <div className="flex-shrink-0 relative z-[2]">
              <Suspense>
                <OrgchartSideNavRight
                  handleOrientationChange={handleOrientationChange}
                  handleLayoutChange={handleLayoutChange}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </GraphComponentContext.Provider>
    </section>
  );
}

export default OrgchartComponent;
