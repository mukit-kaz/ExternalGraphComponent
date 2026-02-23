import { lazy, memo, Suspense, useState } from "react";
import { Sidenav } from "rsuite";
import CollapseIcon from "../assets/icons/CollapseIcon";
import RightArrowIcon from "../assets/icons/RightArrowIcon";

const GraphFilterComponent = lazy(
  () => import("./filter/graphFilterComponent")
);
const FilterSavedComponent = lazy(
  () => import("./filter/filterSavedComponent")
);

const OrgchartSideNavLeft = () => {
  const [expanded, setExpanded] = useState(false);
  const [tabSelected, setTabSelected] = useState({ currentTab: 1 });

  return (
    <>
      <div className="graph-layout-options min-w-8 max-w-[300px] h-[960px] max-h-full">
        {!expanded ? ( //!expanded
          <div className="collapsed-sidebar w-8 h-full border border-t-0 border-reg-gray-200 bg-reg-gray-50">
            <button
              className="reg-tertiary-button-neutral button-small h-fit py-2 flex flex-col items-center justify-center gap-1 min-w-full"
              onClick={() => setExpanded(!expanded)}
            >
              <RightArrowIcon className="w-5 h-5" />
              <p className="mt-2 vertical-text transform rotate-180 text-center text-14-medium text-reg-gray-600">
                Filters
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
                expanded
                  ? "left-0 bg-reg-gray-200"
                  : "left-[-270px] bg-reg-white"
              }`}
            >
              <Sidenav.Body className="h-full overflow-hidden">
                <div className="flex flex-row justify-between pl-[10px] py-[5px] pr-4 h-[35px]">
                  <p className="text-14-medium text-reg-gray-800">Filters</p>
                  <button
                    className="reg-icon-button reg-button-transparent w-8 h-8"
                    onClick={() => setExpanded(!expanded)}
                  >
                    <CollapseIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className={`px-[12px] flex flex-col`}>
                  <ul
                    className="flex items-center border-b border-reg-gray-200 gap-2 ml-1"
                    role="tablist"
                  >
                    <li className="" role="presentation">
                      <button
                        className={`reg-tab-button-container ${
                          tabSelected.currentTab === 1
                            ? "reg-tab-button-selected"
                            : ""
                        }`}
                        id="tab-label-1a"
                        role="tab"
                        onClick={() =>
                          setTabSelected({ ...tabSelected, currentTab: 1 })
                        }
                      >
                        <span>New</span>
                      </button>
                    </li>
                    <li className="" role="presentation">
                      <button
                        className={`reg-tab-button-container 
                          ${
                            tabSelected.currentTab === 2
                              ? "reg-tab-button-selected"
                              : ""
                          }`}
                        id="tab-label-2a"
                        role="tab"
                        onClick={() =>
                          setTabSelected({ ...tabSelected, currentTab: 2 })
                        }
                      >
                        <span>Saved</span>
                      </button>
                    </li>
                  </ul>
                  <div className="pt-2  h-[calc(100vh-13rem)]">
                    <div
                      className={`h-full ${
                        tabSelected.currentTab === 1 ? "" : "hidden"
                      }`}
                      id="tab-panel-1a"
                      aria-hidden={`${
                        tabSelected.currentTab === 1 ? "true" : "false"
                      }`}
                      role="tabpanel"
                      aria-labelledby="tab-label-1a"
                    >
                      <Suspense>
                        <GraphFilterComponent />
                      </Suspense>
                    </div>

                    <div
                      className={`h-full ${
                        tabSelected.currentTab === 2 ? "" : "hidden"
                      }`}
                      id="tab-panel-2a"
                      aria-hidden={`${
                        tabSelected.currentTab === 2 ? "true" : "false"
                      }`}
                      role="tabpanel"
                      aria-labelledby="tab-label-2a"
                    >
                      <Suspense>
                        <FilterSavedComponent />
                      </Suspense>
                    </div>
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
export default memo(OrgchartSideNavLeft);
