/**
 * External Orgchart Component
 * 
 * This is a standalone version of the OrgchartComponent designed to be integrated
 * into external applications. Unlike the internal version, this component:
 * - Accepts all data via props (no Redux dependency)
 * - Provides callbacks for user interactions
 * - Can be used as a standard React component
 * 
 * @example
 * ```jsx
 * import ExternalOrgchartComponent from './external/components/ExternalOrgchartComponent';
 * import { dummyOrgchartConfig } from './external/data/dummyOrgchartData';
 * 
 * function App() {
 *   return (
 *     <ExternalOrgchartComponent
 *       config={dummyOrgchartConfig}
 *       callbacks={{
 *         onNodeClick: (node) => console.log('Node clicked:', node),
 *         onLayoutChange: (layout) => console.log('Layout changed:', layout),
 *       }}
 *     />
 *   );
 * }
 * ```
 */

import React, { useState, useCallback, useMemo } from "react";
import {
  ExternalOrgchartProps,
  ExternalFilterType,
  LayoutType,
  OrientationType,
  ExternalNodeType,
} from "../types/ExternalOrgchartTypes";
import { dummyOrgchartConfig } from "../data/dummyOrgchartData";

const ExternalOrgchartComponent: React.FC<ExternalOrgchartProps> = ({
  config = dummyOrgchartConfig, // Default to dummy data for testing
  callbacks,
  className = "",
  style = {},
}) => {
  const [isLoading] = useState<boolean>(config?.isLoading ?? false);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(
    config?.layout || "HierarchicLayout"
  );
  const [currentOrientation, setCurrentOrientation] = useState<OrientationType>(
    config?.orientation || "top-to-bottom"
  );
  const [currentFilters, setCurrentFilters] = useState<ExternalFilterType[]>(
    config?.filters || []
  );
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  /**
   * Check if any filters are currently active
   */
  const isFiltered = useMemo(() => {
    return currentFilters && currentFilters.length > 0;
  }, [currentFilters]);

  /**
   * Handle layout change events
   */
  const handleLayoutChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newLayout = event.target.value as LayoutType;
      setCurrentLayout(newLayout);
      
      // Reset orientation when layout changes
      setCurrentOrientation("" as OrientationType);
      
      // Notify parent component
      if (callbacks?.onLayoutChange) {
        callbacks.onLayoutChange(newLayout);
      }
    },
    [callbacks]
  );

  /**
   * Handle orientation change events
   */
  const handleOrientationChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOrientation = event.target.value as OrientationType;
      setCurrentOrientation(newOrientation);
      
      // Notify parent component
      if (callbacks?.onOrientationChange) {
        callbacks.onOrientationChange(newOrientation);
      }
    },
    [callbacks]
  );

  /**
   * Reset all filters
   */
  const onResetFilter = useCallback(() => {
    setCurrentFilters([]);
    
    // Notify parent component
    if (callbacks?.onFiltersReset) {
      callbacks.onFiltersReset();
    }
  }, [callbacks]);

  return (
    <section
      className={`bg-reg-white flex px-3 pt-3 w-full h-[calc(100vh-4rem)] overflow-hidden ${className}`}
      style={style}
    >
      <GraphComponentContext.Provider value={graphComponentState}>
        <div className="flex flex-col w-full">
          {/* Header Section */}
          <div className="w-full rounded-t-md h-16 border bg-reg-gray-100-0.55 border-reg-gray-200 flex items-center px-4 z-10">
            <div className="flex items-center pl-3">
              <p className="text-reg-gray-900 text-16-semibold xl:text-18-semibold pr-2">
                {config?.title || "Visual Entity Chart"}
              </p>
              {isFiltered && (
                <div className="reg-chip-button-filter chip-button-small">
                  Filtered
                  <button
                    className="reg-chip-button-close chip-button-close-small"
                    onClick={onResetFilter}
                    aria-label="Reset filters"
                  >
                    <CgClose />
                  </button>
                </div>
              )}
            </div>
            <div className="ml-auto">
              <Suspense fallback={<div>Loading toolbar...</div>}>
                <Toolbar />
              </Suspense>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="w-full flex h-[calc(100vh-4rem)]">
            {/* Left Sidebar - can be customized based on needs */}
            <div className="flex-shrink-0 relative z-[2]">
              {/* Add left sidebar controls here if needed */}
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 relative h-full">
              {!isLoading ? (
                <>
                  <Suspense fallback={<div className="flex items-center justify-center h-full">Loading chart...</div>}>
                    <ReactGraphComponent />
                  </Suspense>
                  <div className="absolute left-16 bottom-16 z-1">
                    <Suspense fallback={null}>
                      <ReactGraphOverviewComponent />
                    </Suspense>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading organizational chart...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Layout and Orientation Controls */}
            <div className="flex-shrink-0 relative z-[2] p-4 bg-white border-l border-gray-200">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="layout-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Layout
                  </label>
                  <select
                    id="layout-select"
                    value={currentLayout}
                    onChange={handleLayoutChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="HierarchicLayout">Hierarchic</option>
                    <option value="TreeLayout">Tree</option>
                    <option value="OrganicLayout">Organic</option>
                    <option value="OrthogonalLayout">Orthogonal</option>
                    <option value="CircularLayout">Circular</option>
                  </select>
                </div>

                {currentLayout === "HierarchicLayout" && (
                  <div>
                    <label
                      htmlFor="orientation-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Orientation
                    </label>
                    <select
                      id="orientation-select"
                      value={currentOrientation}
                      onChange={handleOrientationChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="top-to-bottom">Top to Bottom</option>
                      <option value="bottom-to-top">Bottom to Top</option>
                      <option value="left-to-right">Left to Right</option>
                      <option value="right-to-left">Right to Left</option>
                    </select>
                  </div>
                )}

                {/* Filter information */}
                {isFiltered && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      Active Filters ({currentFilters.length})
                    </p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      {currentFilters.slice(0, 3).map((filter) => (
                        <li key={filter.id}>
                          {filter.entity}: {filter.value}
                        </li>
                      ))}
                      {currentFilters.length > 3 && (
                        <li>...and {currentFilters.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GraphComponentContext.Provider>
    </section>
  );
};

export default ExternalOrgchartComponent;
