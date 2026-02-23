import { useState } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import { Panel, PanelGroup } from "rsuite";
import ColorModal, { ColorModalType } from "../../modal/ColorOption/ColorModal";
import { useAppSelector } from "../../stores/redux-store";
import { GetContrastColor } from "../../utils/extention/stringExtention";
import { GraphControlUtils } from "../../utils/graph-utils/graph-control-utils";
import {
    ControllCheckbox,
    ControllSelect,
    ControllSlider,
    ShapeControllSelect,
} from "../../utils/graph-utils/graphExtention";
import {
    Graph_Layout,
    GraphPreset,
    Shape,
    ShapeToDisplay,
    ViewMode,
} from "../type/constant";
import {
    LayoutControll,
    ShapeEdgeColor,
    TableBodyColor,
    TypeShape,
    TypeShapeColor,
    TypeTableColor,
} from "../type/type";
import "./GraphLayoutControl.scss";

export type GraphLayoutControllProps = {
  hideGeneral?: boolean;
  hideEdge?: boolean;
  hideColor?: boolean;
};

export default function GraphLayoutControll(props:GraphLayoutControllProps) {
  const { hideGeneral } = props;

  const graph = useAppSelector((store) => store.graph, shallowEqual);
  const view = useAppSelector(
    (store) => store.graph.controll.view,
    shallowEqual
  );
  const [controll, setControll] = useState({ ...graph.controll });
  const [colorType, setColorType] = useState<TypeShapeColor>();
  const [tableColorType, setTableColorType] = useState<TypeTableColor>();
  const [tableBodyColorType, setTableBodyColorType] =
    useState<TableBodyColor>();
  const [edgeColorType, setEdgeColorType] = useState<ShapeEdgeColor>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const onControllChange = async () => {
    GraphControlUtils.UpdateLayoutControll({ ...controll, view: view });
  };

  const onControllSave = async () => {
    try {
      const data = await GraphControlUtils.AddChartControlUtil({
        ...controll,
        view: view,
      });
      setControll(() => data);
      onControllChange();
    } catch (error) {
      toast.error(error.response.data.Message ?? "Error saving chart control");
    }
  };

  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    propertyName
  ) => {
    const value = event.target.checked;
    setControll(() => ({ ...controll, [propertyName]: value }));
    onControllChange();
  };

  const presetData = Object.keys(GraphPreset).map((key) => ({
    value: key,
    label: (GraphPreset[key] as string).toUpperCase(),
  }));

  const shapeData = Object.keys(Shape)
    .filter((key) => Shape[key] !== Shape.Default)
    .map((key) => ({
      value: key.toLowerCase(),
      label: (ShapeToDisplay[key] as string).toUpperCase(),
    }));

  const updateShapeControl = (type: TypeShape, value: string) => {
    setControll((prevControll) => {
      const updatedTypeShapes = prevControll.typeShapes.map((shape) => {
        if (shape.key === type.key) {
          return { ...shape, shape: value };
        }
        return shape;
      });

      return { ...prevControll, typeShapes: updatedTypeShapes };
    });
  };

  const ResetColorType = () => {
    setColorType(() => null);
    setIsFiltered(false);
  };
  const ResetTableColorType = () => {
    setTableColorType(() => null);
    setIsFiltered(false);
  };
  const ResetTableBodyColorType = () => {
    setTableBodyColorType(() => null);
    setIsFiltered(false);
  };
  const ResetEdgeColorType = () => {
    setEdgeColorType(() => null);
    setIsFiltered(false);
  };

  const setColor = (value: string, property: string) => {
    if (value == null && property == null) ResetColorType();
    else
      setColorType({
        ...colorType,
        value: {
          ...colorType.value,
          [property]: value,
        },
      });
  };

  const saveColorType = () => {
    setControll((prevControll) => {
      const updatedTypeShapes = prevControll.shapeColors.map((color) => {
        if (color.key === colorType.key) {
          return { ...color, value: colorType.value };
        }
        return color;
      });

      return { ...prevControll, shapeColors: updatedTypeShapes };
    });

    ResetColorType();
  };

  const saveFilterColorType = () => {
    setControll({ ...controll, shapeColorHighlight: { ...colorType.value } });

    ResetColorType();
  };

  const setTableColor = (value: string, property: string) => {
    if (value == null && property == null) ResetTableColorType();
    else
      setTableColorType({
        ...tableColorType,
        value: {
          ...tableColorType.value,
          [property]: value,
        },
      });
  };

  const saveTableColorType = () => {
    setControll((prevControll) => {
      const updatedTypeShapes = prevControll.tableColors.map((color) => {
        if (color.key === tableColorType.key) {
          return { ...color, value: tableColorType.value };
        }
        return color;
      });

      return { ...prevControll, tableColors: updatedTypeShapes };
    });

    ResetTableColorType();
  };

  const setTableBodyColor = (value: string, property: string) => {
    if (value == null && property == null) ResetTableBodyColorType();
    else
      setTableBodyColorType({
        ...tableBodyColorType,
        [property]: value,
      });
  };

  const saveTableBodyColorType = () => {
    setControll((prevControll) => {
      return { ...prevControll, tableBodyColor: { ...tableBodyColorType } };
    });

    ResetTableBodyColorType();
  };

  const saveTableBodyFilterColorType = () => {
    setControll((prevControll) => {
      return {
        ...prevControll,
        tableBodyHighlightColor: { ...tableBodyColorType },
      };
    });

    ResetTableBodyColorType();
  };

  const setEdgeColor = (value: string, property: string) => {
    if (value == null && property == null) ResetEdgeColorType();
    else
      setEdgeColorType({
        ...edgeColorType,
        [property]: value,
      });
  };

  const saveEdgeColorType = () => {
    setControll((prevControll) => {
      return { ...prevControll, shapeEdgeColor: { ...edgeColorType } };
    });

    ResetEdgeColorType();
  };

  const colorTypeMapedColorModalType = () => {
    const colors: ColorModalType[] = [
      {
        color: colorType.value.shapeBgColor,
        property: "shapeBgColor",
        displayName: "Background",
      },
      {
        color: colorType.value.shapeBorderColor,
        property: "shapeBorderColor",
        displayName: "Border",
      },
      {
        color: colorType.value.shapeTextColor,
        property: "shapeTextColor",
        displayName: "Text",
      },
    ];

    return colors;
  };

  const tableColorTypeMapedColorModalType = () => {
    const colors: ColorModalType[] = [
      {
        color: tableColorType.value.tableBorderColor,
        property: "tableBorderColor",
        displayName: "Border",
      },
    ];

    return colors;
  };

  const edgeColorTypeMapedColorModalType = (filter: boolean = false) => {
    const edge = {
      color: edgeColorType.shapeEdgeColor,
      property: "shapeEdgeColor",
      displayName: "Edge",
    };
    const filter_edge = {
      color: edgeColorType.shapeFilterdEdgeColor,
      property: "shapeFilterdEdgeColor",
      displayName: "Edge Filter",
    };
    return [filter ? filter_edge : edge];
  };

  const tableBodyColorTypeMapedColorModalType = () => {
    const colors: ColorModalType[] = [
      {
        color: tableBodyColorType.tableBgColor,
        property: "tableBgColor",
        displayName: "Table Background",
      },
      {
        color: tableBodyColorType.tableBorderColor,
        property: "tableBorderColor",
        displayName: "Table Border",
      },
      {
        color: tableBodyColorType.tableColTextColor,
        property: "tableColTextColor",
        displayName: "Table Header Text",
      },
      {
        color: tableBodyColorType.tableTextColor,
        property: "tableTextColor",
        displayName: "Table Text",
      },
      {
        color: tableBodyColorType.titleBgColor,
        property: "titleBgColor",
        displayName: "Title Background",
      },
      {
        color: tableBodyColorType.titleColor,
        property: "titleColor",
        displayName: "Title Text",
      },
    ];

    return colors;
  };

  const [selectedAccordionId, setSelectedAccordionId] = useState<string | null>(
    null
  );

  return (
    <>
      <div className="flex flex-col w-100 gap-[6px]">
        <div className="arc-presets w-100">
          <ControllSelect
            label="Preset"
            propertyName="preset"
            controll={controll}
            setControll={setControll}
            data={presetData}
          />
        </div>

        <div className="accordion-controls bg-reg-white px-3 py-4 rounded-[4px]">
          <PanelGroup
            className="custom-accordion-group flex flex-col gap-2 pb-2"
            // classPrefix=""
            onSelect={(activeKey) => {
              if (activeKey === selectedAccordionId) {
                setSelectedAccordionId(null);
                return;
              }

              setSelectedAccordionId(activeKey as string);
            }}
          >
            {/* General */}
            { !hideGeneral && <Panel
              header={
                <p
                  className={`text-13-medium ${
                    selectedAccordionId === "1"
                      ? `text-reg-blue-500`
                      : `text-reg-gray-800`
                  }`}
                >
                  General
                </p>
              }
              collapsible
              eventKey={"1"}
              className={`graph-settings-accordion-override ${
                selectedAccordionId === "1"
                  ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                  : ""
              }`}
            >
              <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar pb-4 text-[0.75rem] font-regular font-regular leading-5 text-reg-gray-700">
                {(graph.layout === Graph_Layout.Hierarchic ||
                  graph.layout === Graph_Layout.Tree ||
                  graph.layout === Graph_Layout.Orthogonal) && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllCheckbox(
                      "Integrated Edge Labeling",
                      "integratedEdgeLabeling",
                      controll?.integratedEdgeLabeling,
                      onCheckboxChange
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Hierarchic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllCheckbox(
                      "Automatic Edge Grouping",
                      "automaticEdgeGrouping",
                      controll?.automaticEdgeGrouping,
                      onCheckboxChange
                    )}
                  </div>
                )}

                {(graph.layout === Graph_Layout.Organic ||
                  graph.layout === Graph_Layout.Circular) && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllCheckbox(
                      "Labeling Enabled",
                      "labelingEnabled",
                      controll?.labelingEnabled,
                      onCheckboxChange
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Hierarchic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Node To Node Distance",
                      "nodeToNodeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Hierarchic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Minimum Layer Distance",
                      "minimumLayerDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Hierarchic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Edge To Edge Distance",
                      "edgeToEdgeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Hierarchic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Node To Edge Distance",
                      "nodeToEdgeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Organic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Preferred Edge Length",
                      "preferredEdgeLength",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Organic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Minimum Node Distance",
                      "minimumNodeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Organic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Compactness Factor",
                      "compactnessFactor",
                      controll,
                      setControll,
                      0,
                      1
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Organic && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Preferred Minimum Node To Edge Distance",
                      "preferredMinimumNodeToEdgeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Orthogonal && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Grid Spacing",
                      "gridSpacing",
                      controll,
                      setControll
                    )}
                  </div>
                )}

                {graph.layout === Graph_Layout.Tree && (
                  <div className="border-b border-reg-gray-200 px-3 py-3">
                    {ControllSlider(
                      "Node Distance",
                      "nodeDistance",
                      controll,
                      setControll
                    )}
                  </div>
                )}
              </div>
            </Panel>}

            {graph.controll?.view === ViewMode.Shape && (
              <>
                {/* Shape */}
                <Panel
                  header={
                    <p
                      className={`text-13-medium ${
                        selectedAccordionId === "2"
                          ? `text-reg-blue-500`
                          : `text-reg-gray-800`
                      }`}
                    >
                      Shape
                    </p>
                  }
                  collapsible
                  eventKey={"2"}
                  className={`graph-settings-accordion-override ${
                    selectedAccordionId === "2"
                      ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                      : ""
                  }`}
                >
                  <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar flex flex-col gap-4 px-3 py-3 pb-4 text-[0.75rem] font-medium leading-5 text-reg-gray-800">
                    {controll?.typeShapes?.map((type) => {
                      return ShapeControllSelect(
                        false,
                        type,
                        shapeData,
                        updateShapeControl
                      );
                    })}
                  </div>
                </Panel>

                {/* Edge */}
                { !props.hideEdge && <Panel
                  header={
                    <p
                      className={`text-13-medium ${
                        selectedAccordionId === "3"
                          ? `text-reg-blue-500`
                          : `text-reg-gray-800`
                      }`}
                    >
                      Edge
                    </p>
                  }
                  collapsible
                  eventKey={"3"}
                  className={`graph-settings-accordion-override ${
                    selectedAccordionId === "3"
                      ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                      : ""
                  }`}
                >
                  <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar flex flex-col gap-4 px-3 py-3 pb-4">
                    <EdgeColor
                      controll={controll}
                      setEdgeColorType={setEdgeColorType}
                      setIsFiltered={setIsFiltered}
                    />
                  </div>
                </Panel>}

                {/* Color */}
                { !props.hideColor && <Panel
                  header={
                    <p
                      className={`text-13-medium ${
                        selectedAccordionId === "4"
                          ? `text-reg-blue-500`
                          : `text-reg-gray-800`
                      }`}
                    >
                      Color
                    </p>
                  }
                  collapsible
                  eventKey={"4"}
                  className={`graph-settings-accordion-override ${
                    selectedAccordionId === "4"
                      ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                      : ""
                  }`}
                >
                  <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar flex flex-col gap-4 px-3 py-3 pb-4">
                    {graph.controll?.view === ViewMode.Shape &&
                      controll?.shapeColors?.map((type) => {
                        return (
                          <ShapeColorByType
                            type={type}
                            setColorType={setColorType}
                          />
                        );
                      })}

                    {Separetor()}

                    <ShapeFilter
                      controll={controll}
                      setColorType={setColorType}
                      setIsFiltered={setIsFiltered}
                    />
                  </div>
                </Panel>}
              </>
            )}

            {graph.controll?.view === ViewMode.Table && (
              <>
                {/* Edge */}
                { !props.hideEdge && <Panel
                  header={
                    <p
                      className={`text-13-medium ${
                        selectedAccordionId === "3"
                          ? `text-reg-blue-500`
                          : `text-reg-gray-800`
                      }`}
                    >
                      Edge
                    </p>
                  }
                  collapsible
                  eventKey={"3"}
                  className={`graph-settings-accordion-override ${
                    selectedAccordionId === "3"
                      ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                      : ""
                  }`}
                >
                  <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar flex flex-col gap-4 px-3 py-3 pb-4">
                    <EdgeColor
                      controll={controll}
                      setEdgeColorType={setEdgeColorType}
                      setIsFiltered={setIsFiltered}
                    />
                  </div>
                </Panel>}

                {/* Color */}
                { !props.hideColor && <Panel
                  header={
                    <p
                      className={`text-13-medium ${
                        selectedAccordionId === "4"
                          ? `text-reg-blue-500`
                          : `text-reg-gray-800`
                      }`}
                    >
                      Color
                    </p>
                  }
                  collapsible
                  eventKey={"4"}
                  className={`graph-settings-accordion-override ${
                    selectedAccordionId === "4"
                      ? `graph-settings-accordion-selected border border-reg-blue-500 bg-reg-blue-100`
                      : ""
                  }`}
                >
                  <div className="settings-panel-internal bg-reg-white 2xl:max-h-96 lg:h-fit overflow-y-auto scrollbar flex flex-col gap-4 px-3 py-3 pb-4">
                    <TableStructureColor
                      controll={controll}
                      setTableBodyColorType={setTableBodyColorType}
                      setIsFiltered={setIsFiltered}
                    />

                    {Separetor("Top Line")}

                    {controll?.tableColors?.map((type) => {
                      return (
                        <TableColorByType
                          type={type}
                          setTableColorType={setTableColorType}
                        />
                      );
                    })}
                  </div>
                </Panel>}
              </>
            )}
          </PanelGroup>
        </div>

        <div className="apply-presets">
          <button
            className="reg-primary-button-brand button-medium w-full"
            onClick={onControllSave}
          >
            Apply
          </button>
        </div>
      </div>

      {colorType && (
        <ColorModal
          saveColorType={isFiltered ? saveFilterColorType : saveColorType}
          setColor={setColor}
          colors={colorTypeMapedColorModalType()}
          name={colorType.key}
          modalSize="lg"
        />
      )}

      {tableColorType && (
        <ColorModal
          saveColorType={saveTableColorType}
          setColor={setTableColor}
          colors={tableColorTypeMapedColorModalType()}
          name={tableColorType.key}
          modalSize="40rem"
        />
      )}

      {tableBodyColorType && (
        <ColorModal
          saveColorType={
            isFiltered ? saveTableBodyFilterColorType : saveTableBodyColorType
          }
          setColor={setTableBodyColor}
          colors={tableBodyColorTypeMapedColorModalType()}
          name={isFiltered ? "Table Body" : "Table Filter Body"}
          modalSize="50rem"
        />
      )}

      {edgeColorType && (
        <ColorModal
          saveColorType={saveEdgeColorType}
          setColor={setEdgeColor}
          colors={edgeColorTypeMapedColorModalType(isFiltered)}
          name={isFiltered ? "Edge Filter Color" : "Edge Color"}
          modalSize="40rem"
        />
      )}
    </>
  );
}

type TableColorByTypeProps = {
  type: TypeTableColor;
  setTableColorType: React.Dispatch<React.SetStateAction<TypeTableColor>>;
};

function TableColorByType(props: TableColorByTypeProps) {
  const { type, setTableColorType } = props;
  return (
    <button
      // disabled
      style={{
        backgroundColor: type.value.tableBorderColor,
        border: `2px solid ${type.value.tableBorderColor}`,
        color: GetContrastColor(type.value.tableBorderColor),
      }}
      className="px-4 py-[6px] text-center rounded-sm hover:ring-2 hover:ring-reg-blue-500 leading-5"
      onClick={() => {
        setTableColorType(() => type);
      }}
    >
      <span>{type?.key === "default" ? "Default" : type?.key}</span>
    </button>
  );
}

type TableStructureColorProps = {
  controll: LayoutControll;
  setTableBodyColorType: React.Dispatch<React.SetStateAction<TableBodyColor>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
};

function TableStructureColor(props: TableStructureColorProps) {
  const { controll, setTableBodyColorType, setIsFiltered } = props;
  return (
    <>
      <button
        // disabled
        style={{
          backgroundColor: controll?.tableBodyColor?.tableBgColor,
          border: `2px solid ${controll?.tableBodyColor?.tableBorderColor}`,
          color: GetContrastColor(controll?.tableBodyColor?.tableBgColor),
        }}
        className="px-4 py-[6px] text-center rounded-sm hover:ring-2 hover:ring-reg-blue-500 leading-5"
        onClick={() => {
          setTableBodyColorType(controll?.tableBodyColor);
        }}
      >
        <span>Default</span>
      </button>

      <button
        // disabled
        style={{
          backgroundColor: controll?.tableBodyHighlightColor?.tableBgColor,
          border: `2px solid ${controll?.tableBodyHighlightColor?.tableBorderColor}`,
          color: GetContrastColor(
            controll?.tableBodyHighlightColor?.tableBgColor
          ),
        }}
        className="px-4 py-[6px] text-center rounded-sm hover:ring-2 hover:ring-reg-blue-500 leading-5"
        onClick={() => {
          setTableBodyColorType(controll?.tableBodyHighlightColor);
          setIsFiltered(true);
        }}
      >
        <span>Filter</span>
      </button>
    </>
  );
}

type ShapeColorByTypeProps = {
  type: TypeShapeColor;
  setColorType: React.Dispatch<React.SetStateAction<TypeShapeColor>>;
};

function ShapeColorByType(props: ShapeColorByTypeProps) {
  const { type, setColorType } = props;
  return (
    <button
      // disabled
      style={{
        backgroundColor: type.value.shapeBgColor,
        border: `2px solid ${type.value.shapeBorderColor}`,
        color: type.value.shapeTextColor,
      }}
      className="px-4 py-[6px] text-center rounded-sm hover:ring-2 hover:ring-reg-blue-500 leading-5"
      onClick={() => {
        setColorType(() => type);
      }}
    >
      <span style={{ color: type.value.shapeTextColor }}>
        {type?.key === "default" ? "Default" : type?.key}
      </span>
    </button>
  );
}

type ShapeFilterProps = {
  controll: LayoutControll;
  setColorType: React.Dispatch<React.SetStateAction<TypeShapeColor>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShapeFilter(props: ShapeFilterProps) {
  const { controll, setColorType, setIsFiltered } = props;
  return (
    <button
      // disabled
      style={{
        backgroundColor: controll?.shapeColorHighlight?.shapeBgColor,
        border: `2px solid ${controll?.shapeColorHighlight?.shapeBorderColor}`,
        color: controll?.shapeColorHighlight?.shapeTextColor,
      }}
      className="px-4 py-[6px] text-center rounded-sm hover:ring-2 hover:ring-reg-blue-500 leading-5"
      onClick={() => {
        setColorType(() => {
          return {
            key: "Highlighter",
            value: controll?.shapeColorHighlight,
          };
        });
        setIsFiltered(true);
      }}
    >
      <span>Filter Highlighter</span>
    </button>
  );
}

type EdgeColorProps = {
  controll: LayoutControll;
  setEdgeColorType: React.Dispatch<React.SetStateAction<ShapeEdgeColor>>;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
};

function EdgeColor(props: EdgeColorProps) {
  const { controll, setEdgeColorType, setIsFiltered } = props;

  return (
    <>
      <button
        // disabled
        className="px-4 py-[6px] text-center rounded-[4px]  leading-5"
        style={{
          backgroundColor: controll?.shapeEdgeColor?.shapeEdgeColor,
          color: GetContrastColor(controll?.shapeEdgeColor?.shapeEdgeColor),
        }}
        onClick={() => {
          setEdgeColorType(controll?.shapeEdgeColor);
          setIsFiltered(false);
        }}
      >
        <span>Default</span>
      </button>
      <button
        // disabled
        style={{
          backgroundColor: controll?.shapeEdgeColor?.shapeFilterdEdgeColor,
          color: GetContrastColor(
            controll?.shapeEdgeColor?.shapeFilterdEdgeColor
          ),
        }}
        className="px-4 py-[6px] text-center rounded-[4px]  leading-5"
        onClick={() => {
          setEdgeColorType(controll?.shapeEdgeColor);
          setIsFiltered(true);
        }}
      >
        <span>Filter</span>
      </button>
    </>
  );
}

function Separetor(name?: string) {
  // temp design
  return (
    <div>
      <div className="border-t-[1px] border-reg-gray-200 text-left text-14-medium pt-3">
        {name && <span className="">{name}</span>}
      </div>
    </div>
  );
}
