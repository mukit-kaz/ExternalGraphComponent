import { useEffect, useMemo, useState } from "react";
import { SelectPicker } from "rsuite";
import OrientationIcon from "../../assets/icons/OrientationIcon";
import ResetIcon from "../../assets/icons/ResetIcon";
import { useAppSelector } from "../../stores/redux-store";
import { GraphControlUtils } from "../../utils/graph-utils/graph-control-utils";
import { Graph_Layout, GraphOrientation } from "../type/constant";
import { GraphLayout } from "../type/type";

//#region graph layout static data
const graphLayout: GraphLayout[] = [
  {
    layout: Graph_Layout.Hierarchic,
    name: "Hierarchic",
    orientation: [
      { name: "Top to Bottom", layout: GraphOrientation.Top_to_Bottom },
      { name: "Bottom to Top", layout: GraphOrientation.Bottom_to_Top },
      { name: "Left to Right", layout: GraphOrientation.Left_to_Right },
      { name: "Right to Left", layout: GraphOrientation.Right_to_Left },
    ],
  },
  {
    layout: Graph_Layout.Tree,
    name: "Tree",
    orientation: [
      { name: "Top to Bottom", layout: GraphOrientation.Top_to_Bottom },
      { name: "Bottom to Top", layout: GraphOrientation.Bottom_to_Top },
      { name: "Left to Right", layout: GraphOrientation.Left_to_Right },
      { name: "Right to Left", layout: GraphOrientation.Right_to_Left },
    ],
  },
  {
    layout: Graph_Layout.Organic,
    name: "Organic",
  },
  {
    layout: Graph_Layout.Orthogonal,
    name: "Orthogonal",
  },
  {
    layout: Graph_Layout.Circular,
    name: "Circular",
    orientation: [
      { name: "Single Cycle", layout: GraphOrientation.SingleCycle },
      { name: "BCC Compact", layout: GraphOrientation.BCCCompact },
      { name: "BCC Isolated", layout: GraphOrientation.BCCIsolated },
    ],
  },
];
//#endregion

export type GraphLayoutSelectorParam = {
  handleLayoutChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleOrientationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function GraphLayoutSelector(props: GraphLayoutSelectorParam) {
  const selectedLayout = useAppSelector((store) => store.graph.layout);
  const selectedOrientation = useAppSelector(
    (store) => store.graph.orientation
  );

  const selectableOrientationList = useMemo(() => {
    if (!selectedLayout) return [];
    return (
      graphLayout.find((layout) => layout.layout === selectedLayout)
        ?.orientation || []
    );
  }, [selectedLayout]);

  const [currentSelectedOrientation, setCurrentSelectedOrientation] =
    useState<string>(
      selectedOrientation ?? selectableOrientationList[0]?.layout
    );

  useEffect(() => {
    if (selectedOrientation) {
      setCurrentSelectedOrientation(selectedOrientation);
    } else {
      // This is the condition when you first time select the layout and orientation is not selected
      setCurrentSelectedOrientation(selectableOrientationList[0]?.layout);
      props.handleOrientationChange({
        target: { value: selectableOrientationList[0]?.layout },
      } as any);
    }
  }, [selectedOrientation, selectableOrientationList]);

  return (
    <>
      <div className="flex flex-col bg-reg-white rounded-md">
        <div className="flex flex-col pt-4 px-3">
          <label
            htmlFor="layoutSelect"
            className="block text-reg-gray-800 text-13-medium"
          >
            Layout
          </label>
          <SelectPicker
            className="w-56 placeholder:text-reg-gray-500 my-1"
            data={graphLayout.map((layoutOption) => ({
              label: layoutOption.name,
              value: layoutOption.layout,
            }))}
            searchable={false}
            value={selectedLayout}
            onChange={(value) =>
              props.handleLayoutChange({ target: { value } } as any)
            }
            placeholder="Select Layout"
          />
        </div>

        <div className="flex flex-col pt-4 px-3 pb-4">
          <label
            htmlFor="orientationSelect"
            className="pb-1 text-reg-gray-800 text-13-medium"
          >
            Orientation
          </label>

          <div className="flex flex-wrap gap-1">
            {selectableOrientationList.length > 0 &&
              selectableOrientationList.map((orientation) => (
                <button
                  key={orientation.layout}
                  className={`graph-properties-selector-button-transition w-32 py-3 px-3 rounded-md text-reg-gray-600 flex flex-col gap-[6px] items-center
                 ${
                   currentSelectedOrientation === orientation.layout
                     ? "bg-reg-blue-100 border border-reg-blue-300"
                     : ""
                 }`}
                  onClick={() =>
                    props.handleOrientationChange({
                      target: { value: orientation.layout },
                    } as any)
                  }
                >
                  <OrientationIcon orientationName={orientation.layout} />
                  {orientation.name}
                </button>
              ))}
            {selectableOrientationList.length === 0 && (
              <p className="text-13-regular text-reg-gray-500 italic">
                Default Orientation
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-1">
        <button
          className="reg-tertiary-button-neutral button-small px-3 w-fit bg-transparent rounded-md text-reg-gray-600 flex flex-row gap-[6px] items-center"
          onClick={() => GraphControlUtils.ResetLayout()}
        >
          <ResetIcon className="w-4 h-4" />
          Reset
        </button>
      </div>
    </>
  );
}
