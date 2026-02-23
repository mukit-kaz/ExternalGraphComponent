import { memo, Suspense, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { Sidenav } from "rsuite";
import NoSavedFilters from "../assets/graphics/NoSavedFilters";
import CollapseIcon from "../assets/icons/CollapseIcon";
import RightArrowIcon from "../assets/icons/RightArrowIcon";
import { useAppSelector } from "../stores/redux-store";
import GraphEntityDetails from "./components/GraphEntityDetails";
import GraphLayoutControll from "./components/GraphLayoutControll";
import GraphLayoutSelector from "./components/GraphLayoutSelector";
import { CgClose } from "react-icons/cg";
import { MdInfoOutline } from "react-icons/md";

export type OrgChartSideRightProps = {
  handleLayoutChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOrientationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  expande?: boolean;

  hideLayoutOptions?: boolean;
  hideControlOptions?: boolean;
  hideEntityDetails?: boolean;

  hideGeneral?: boolean;
  hideEdge?: boolean;
  hideColor?: boolean;
};

const OrgchartSideNavRight = (props: OrgChartSideRightProps) => {
  const [expanded, setExpanded] = useState(false);
  const [tabSelected, setTabSelected] = useState({ currentTab: 1 });
  const [infoClosed, setInfoClosed] = useState(() => sessionStorage.getItem('graphInfoTooltipClosed') === 'true');

  const node = useAppSelector(
    (store) => store.entity.selectedEntityIntoGraph,
    shallowEqual
  );

  useEffect(() => {
    if (node) {
      setTabSelected({ currentTab: 3 });
    } else {
      setTabSelected({ currentTab: 2 });
    }
  }, [node]);

  const handleCloseInfo = () => {
    setInfoClosed(true);
    sessionStorage.setItem('graphInfoTooltipClosed', 'true');
  };

  return (
    <>
      <div className="graph-layout-options min-w-8 max-w-[300px] h-[960px] max-h-full">
        <div className={`group bg-reg-white cursor-pointer p-2 h-8 rounded-md shadow absolute top-2 right-10 flex items-center overflow-hidden transition-all duration-300 ease-in-out ${infoClosed ? '' : 'pr-1'}`}>
          <MdInfoOutline className="w-4.5 h-4.5 flex-shrink-0" />
          <div className={`whitespace-nowrap text-reg-gray-500 text-14-medium transition-all duration-300 ease-in-out ${infoClosed ? 'max-w-0 opacity-0 group-hover:max-w-[400px] group-hover:opacity-100' : 'max-w-[400px] opacity-100'}`}>
            <span className="ml-1.5">
              Press &nbsp;
              <kbd className="kbd kbd-xs bg-reg-gray-100 border border-reg-gray-300 text-reg-gray-500 rounded-[3px]">
                Ctrl
              </kbd>
              &nbsp; + &nbsp;
              <kbd className="kbd kbd-xs bg-reg-gray-100 border border-reg-gray-300 text-reg-gray-500 rounded-[3px]">
                Left Click
              </kbd>
              &nbsp; to drag
            </span>
          </div>
          {!infoClosed && (
            <button
              onClick={handleCloseInfo}
              className="ml-1.5 p-0.5 hover:bg-reg-gray-100 rounded transition-colors flex-shrink-0"
            >
              <CgClose className="w-3.5 h-3.5 text-reg-gray-500" />
            </button>
          )}
        </div>

        {!expanded ? (
          <div className="collapsed-sidebar w-8 h-full border border-t-0 border-reg-gray-200 bg-reg-gray-50">
            <button
              className="reg-tertiary-button-neutral button-small h-fit py-2 flex flex-col items-center justify-center gap-1 min-w-full"
              onClick={() => setExpanded(!expanded)}
            >
              <RightArrowIcon className="w-5 h-5 transform rotate-180" />
              <p className="mt-2 vertical-text transform rotate-360 text-center text-14-medium text-reg-gray-600">
                Properties
              </p>
            </button>
          </div>
        ) : (
          <div className="chart-left-sidebar-expanded">
            <Sidenav
              defaultOpenKeys={["save_filter", "filter"]}
              expanded={expanded}
              appearance="default"
              className={`absolute w-[300px] max-w-[300px] h-full ${
                expanded ? "left-[-270px] bg-reg-gray-200" : " bg-reg-white"
              }`}
            >
              <Sidenav.Body className="h-full overflow-hidden">
                <div className="flex flex-row justify-between pl-[10px] py-[5px] pr-4 h-[35px]">
                  <p className="text-14-medium text-reg-gray-800">Properties</p>
                  <button
                    className="reg-icon-button reg-button-transparent w-8 h-8"
                    onClick={() => setExpanded(!expanded)}
                  >
                    <CollapseIcon
                        className={`w-5 h-5 transform ${
                            expanded ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </button>
                </div>

                <div className={`${expanded ? "" : "hidden"} flex flex-col`}>
                  <ul
                    className="flex items-center border-b border-reg-gray-200 px-[10px] gap-2"
                    role="tablist"
                  >
                    { !props.hideLayoutOptions && <li className="" role="presentation">
                      <button
                        className={`reg-tab-button-container ${
                          tabSelected.currentTab === 1
                            ? "reg-tab-button-selected"
                            : "text-reg-gray-500 text-13-medium"
                        }`}
                        id="tab-label-1a"
                        role="tab"
                        onClick={() =>
                          setTabSelected({ ...tabSelected, currentTab: 1 })
                        }
                      >
                        <span>Layout</span>
                      </button>
                    </li>}
                    { !props.hideControlOptions && <li className="" role="presentation">
                      <button
                        className={`reg-tab-button-container ${
                          tabSelected.currentTab === 2
                            ? "reg-tab-button-selected"
                            : "text-reg-gray-500 text-13-medium"
                        }`}
                        id="tab-label-2a"
                        role="tab"
                        onClick={() =>
                          setTabSelected({ ...tabSelected, currentTab: 2 })
                        }
                      >
                        <span>Control</span>
                      </button>
                    </li>}

                    {!props.hideEntityDetails && <li className="" role="presentation">
                      <button
                        className={`reg-tab-button-container ${
                          tabSelected.currentTab === 3
                            ? "reg-tab-button-selected"
                            : "text-reg-gray-500 text-13-medium"
                        }`}
                        id="tab-label-2a"
                        role="tab"
                        onClick={() =>
                          setTabSelected({ ...tabSelected, currentTab: 3 })
                        }
                      >
                        <span>Entity Details</span>
                      </button>
                    </li>}
                  </ul>

                  <div className="pt-2 h-[calc(100vh-14rem)] overflow-y-auto">
                    { !props.hideLayoutOptions && <div
                      className={`h-full px-[6px] ${
                        tabSelected.currentTab === 1 ? "" : "hidden"
                      }`}
                      id="tab-panel-1a"
                      role="tabpanel"
                    >
                      <Suspense>
                        <GraphLayoutSelector
                          handleOrientationChange={
                            props.handleOrientationChange
                          }
                          handleLayoutChange={props.handleLayoutChange}
                        />
                      </Suspense>
                    </div>}

                    { !props.hideControlOptions && <div
                      className={`h-full px-[6px] ${
                        tabSelected.currentTab === 2 ? "" : "hidden"
                      }`}
                      id="tab-panel-2a"
                      role="tabpanel"
                    >
                      <Suspense>
                        <GraphLayoutControll hideGeneral={props.hideGeneral} hideEdge={props.hideEdge} hideColor={props.hideColor} />
                      </Suspense>
                    </div>}

                    { !props.hideEntityDetails && <div
                      className={`h-full  px-[6px] ${
                        tabSelected.currentTab === 3 ? "" : "hidden"
                      }`}
                      id="tab-panel-3a"
                      role="tabpanel"
                    >
                      <Suspense>
                        {node && node.name ? (
                          <GraphEntityDetails node={node} />
                        ) : (
                          <div className="w-full mt-14 h-3/5 flex flex-col px-12 items-center justify-center gap-4">
                            <NoSavedFilters className="w-20 h-20" />
                            <p className="text-14-medium text-reg-gray-600 text-center">
                              Select block from the chart to see the Entity
                              Details.
                            </p>
                          </div>
                        )}
                      </Suspense>
                    </div>}
                  </div>
                </div>
              </Sidenav.Body>
            </Sidenav>
          </div>
        )}
      </div>
    </>
  );
};
export default memo(OrgchartSideNavRight);
