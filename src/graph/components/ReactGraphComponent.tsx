import "@yfiles/yfiles/yfiles.css";
import { useContext, useLayoutEffect, useRef, useState, useEffect } from "react";
import { GraphComponent, GraphEditorInputMode, LabelLayerPolicy } from "@yfiles/yfiles";
import "../lib/yFilesLicense";
import { GraphComponentContext } from "../lib/GraphComponentContext";
// import { useTooltips } from "../lib/use-tooltips";
import { useAppSelector } from "../../stores/redux-store";
import loadGraph from "../lib/loadGraph";
import { ContextMenuComponent } from "./ContextMenuComponent";

export default function ReactGraphComponent() {
  // get hold of the GraphComponent
  const { graphComponent, graphComponentContainer } = useGraphComponent();
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  // register tooltips on graph items
  // useTooltips(graphComponent);

  useEffect(() => {
    const gc = graphComponent.current;
    if (!gc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && !isCtrlPressed) {
        setIsCtrlPressed(true);
        gc.div.style.cursor = "grab";
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && isCtrlPressed) {
        setIsCtrlPressed(false);
        gc.div.style.cursor = "move";
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isCtrlPressed && e.button === 0) {
        gc.div.style.cursor = "grabbing";
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0 && isCtrlPressed) {
        gc.div.style.cursor = "grab";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isCtrlPressed, graphComponent]);

  return (
    <>
      <div
        className="w-full h-full bg-reg-gray-100"
        ref={graphComponentContainer}
      />
      <ContextMenuComponent graphComponent={graphComponent.current} />
    </>
  );
}

function useGraphComponent() {
  const graphComponentContainer = useRef<HTMLDivElement>(null);
  const graphComponent = useRef<GraphComponent>();
  const graph = useAppSelector((store) => store.graph);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setGraphComponent] = useContext(GraphComponentContext);

  useLayoutEffect(() => {
    const gcContainer = graphComponentContainer.current;
    if (!gcContainer) {
      return;
    }

    // initialize the GraphComponent
    const gc = new GraphComponent();

    // register interaction
    gc.inputMode = new GraphEditorInputMode({
      defaultCursor: "move",
      allowEditLabel: false,
      allowEditLabelOnDoubleClick: false,
      allowReparentNodes: false,
      allowCreateEdge: false,
      allowCreateBend: false,
      allowCreateNode: false,
      allowClipboardOperations: false,
      allowGroupingOperations: false,
      allowGroupSelection: false,
      allowUndoOperations: false,
      // selectableItems:graph.controll.view==='shape' ? GraphItemTypes.ALL : GraphItemTypes.NONE,
      // movableItems:GraphItemTypes.ALL,
    });

    async function initializeGraph() {
      gc.graph = await loadGraph(graph.graph, graph.layout, graph.orientation,graph.controll);
      gc.graph.undoEngineEnabled = true;
      gc.graphModelManager.edgeLabelLayerPolicy=LabelLayerPolicy.AT_OWNER;
      gc.fitGraphBounds();
    }
    initializeGraph();

    graphComponent.current = gc;

    // Update the context
    setTimeout(setGraphComponent, 0, gc);

    gc.div.style.width = "100%";
    gc.div.style.height = "100%";
    gc.div.style.cursor = "move";
    gcContainer.append(gc.div);

    return () => {
      gc.cleanUp();
      graphComponent.current = undefined;
      gcContainer.innerHTML = "";
    };
  }, [graphComponentContainer, setGraphComponent, graph]);

  return { graphComponentContainer, graphComponent };
}
