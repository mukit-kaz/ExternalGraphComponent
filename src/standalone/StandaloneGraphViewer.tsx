import React, { useLayoutEffect, useRef } from "react";
import "@yfiles/yfiles/yfiles.css";
import { GraphComponent, GraphEditorInputMode } from "@yfiles/yfiles";
import type { NodeWithEdge, LayoutControll } from "./types/type";
import { Graph_Layout, GraphOrientation } from "./types/constant";
import loadGraph from "./lib/loadGraph";
import { getDefaultLayoutControll } from "./data";
import "./lib/yFilesLicense";

export interface StandaloneGraphViewerProps {
  data: NodeWithEdge;
  layout?: string;
  orientation?: string;
  layoutControll?: LayoutControll;
  className?: string;
  style?: React.CSSProperties;
}

export function StandaloneGraphViewer({
  data,
  layout = Graph_Layout.Hierarchic,
  orientation = GraphOrientation.Top_to_Bottom,
  layoutControll,
  className = "",
  style = {},
}: StandaloneGraphViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphComponentRef = useRef<GraphComponent | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Initialize the GraphComponent
    const gc = new GraphComponent();

    // Configure input mode for view-only interaction
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
    });

    // Style and append the graph component first
    gc.div.style.width = "100%";
    gc.div.style.height = "100%";
    gc.div.style.cursor = "move";
    container.append(gc.div);

    graphComponentRef.current = gc;

    // Initialize the graph with data
    async function initializeGraph() {
      try {
        const controll = layoutControll ?? getDefaultLayoutControll();
        
        gc.graph = await loadGraph(data, layout, orientation, controll);
        gc.graph.undoEngineEnabled = true;
        gc.fitGraphBounds();
      } catch (error) {
        console.error("Error loading graph:", error);
      }
    }

    initializeGraph();

    // Cleanup on unmount
    return () => {
      gc.cleanUp();
      graphComponentRef.current = null;
      container.innerHTML = "";
    };
  }, [data, layout, orientation, layoutControll]);

  const defaultStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "#F8F9FA",
    ...style,
  };

  return (
    <div ref={containerRef} className={className} style={defaultStyle}></div>
  );
}

export default StandaloneGraphViewer;
