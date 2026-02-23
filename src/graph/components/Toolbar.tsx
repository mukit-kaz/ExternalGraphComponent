/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { ICommand } from "@yfiles/yfiles";
import { memo, useContext, useEffect, useState } from "react";
import { HiArrowsPointingIn, HiArrowsPointingOut } from "react-icons/hi2";
import { shallowEqual } from "react-redux";
import { Tooltip, Whisper } from "rsuite";
import FitToScreenIcon from "../../assets/icons/components/FitToScreenIcon";
import FitToWidthIcon from "../../assets/icons/components/FitToWidthIcon";
import ZoomInIcon from "../../assets/icons/components/ZoomInIcon";
import ZoomOutIcon from "../../assets/icons/components/ZoomOutIcon";
import export_as_image from "../../assets/icons/export_as_image.svg";
import export_as_pdf from "../../assets/icons/export_as_pdf.svg";
import print_icon from "../../assets/icons/print_icon_2.svg";
import LegendMessageModal from "../../modal/message-modal/LegendMessageModal";
import { applyGraphZoom } from "../../modules/heatmap/utils/graphZoomUtils";
import { useAppSelector } from "../../stores/redux-store";
import { GraphControlUtils } from "../../utils/graph-utils/graph-control-utils";
import { ExportFormat, ExportSupport } from "../lib/ExportSupport";
import { GraphComponentContext } from "../lib/GraphComponentContext";
import PrintingSupport from "../lib/PrintingSupport";
import { ViewMode } from "../type/constant";
import CustomToggle from "./CustomToggle";
import {
  GenerateShapeLegend,
  GenerateTableLegend,
} from "./GraphControllLegend";

interface ToolbarProps {
  hideExportButtons?: boolean;
  hideViewToggle?: boolean;
  hideZoomControls?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { hideExportButtons, hideViewToggle, hideZoomControls, onFullscreenChange } = props;

  const [showModal, setShowModal] = useState(false);
  const [onAction, setOnAction] = useState<(islegend?: boolean) => void>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fitMode, setFitMode] = useState<"width" | "screen">("width"); 

  const chartData = useAppSelector((state) => state.chart, shallowEqual);
  const control = useAppSelector((state) => state.graph.controll, shallowEqual);

  const [view, setView] = useState(control.view);

  useEffect(() => {
    setView(control.view);
  }, [control]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreen = !!document.fullscreenElement;
      setIsFullscreen(fullscreen);
      if (onFullscreenChange) {
        onFullscreenChange(fullscreen);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onFullscreenChange]);

  const chartName =
    chartData.chartList.find(
      (chart) => chart.chartId === chartData.selectedChartId
    )?.chartName ?? "Entity Chart";
  const [graphComponent] = useContext(GraphComponentContext);
  const max = 1080;

  const getScaleByWidth = (width: number) => {
    return 1 / (Math.floor(width / max) + 1);
  };

  function exportFile(format: ExportFormat, islegend?: boolean): Promise<void> {
    if (!graphComponent) {
      return;
    }

    // export the graph of the current view
    const graph = graphComponent.graph;

    if (graph.nodes.size === 0) {
      return;
    }

    graphComponent.updateContentRect(30);
    const exportArea = graphComponent.contentRect;
    switch (format) {
      case ExportFormat.SVG:
        ExportSupport.saveSvg(graph, exportArea, 1, chartName);
        break;
      case ExportFormat.PNG:
        {
          const scale = scaleImage(exportArea.area, 10000000);
          ExportSupport.savePng(graph, exportArea, scale, chartName);
        }
        break;
      case ExportFormat.PDF:
        {
          const scale = scaleImage(exportArea.area, 10000000);
          const legend = islegend
            ? view === "shape"
              ? GenerateShapeLegend(control)
              : GenerateTableLegend(control)
            : "";
          ExportSupport.savePdf(graph, exportArea, scale, chartName, legend);
        }
        break;
    }
  }

  const scaleImage = (exportArea: number, fitArea: number) => {
    const area = exportArea === 0 ? 0.1 : exportArea;
    const point = fitArea / area;
    return point > 1 ? 1 : point;
  };

  function print(islegend?: boolean) {
    if (graphComponent) {
      const exportArea = graphComponent.contentRect;
      const scale = getScaleByWidth(exportArea.width);
      const legend = islegend
        ? view === "shape"
          ? GenerateShapeLegend(control)
          : GenerateTableLegend(control)
        : "";
      new PrintingSupport(scale).printGraph(
        chartName,
        graphComponent.graph,
        undefined,
        legend
      );
    }
  }
  function pdf(islegend?: boolean) {
    exportFile(ExportFormat.PDF, islegend);
  }

  const handlePrintButtonClick = () => {
    setShowModal(() => true);
    setOnAction(() => print);
  };

  const handlePdfButtonClick = () => {
    setShowModal(() => true);
    setOnAction(() => pdf);
  };

  const toggleFullscreen = () => {
    const documentElement = document.documentElement;

    if (document.fullscreenElement) {
      const exitFullscreen = document.exitFullscreen;
      exitFullscreen.call(document).catch(() => {
        alert(
          `Error attempting to exit full-screen mode. Perhaps it was blocked by your browser.`
        );
      });
    } else {
      const requestFullscreen = documentElement.requestFullscreen;

      requestFullscreen.call(documentElement).catch(() => {
        alert(
          `Error attempting to enable full-screen mode. Perhaps it was blocked by your browser.`
        );
      });
    }
  };

  const onSwitchView = (checked: boolean) => {
    checked ? setView(() => ViewMode.Table) : setView(() => ViewMode.Shape);
    GraphControlUtils.SwitchGraphViewControll(
      checked ? ViewMode.Table : ViewMode.Shape
    );
  };

  function onPngExport(): void {
    exportFile(ExportFormat.PNG);
  }

  const handleFitToMode = async () => {
    if (graphComponent) {
      if (fitMode === "width") {
        // Switch to fit to screen
        const contentRect = graphComponent.contentRect;
        const marginX = contentRect.width * 0.1;
        const marginY = contentRect.height * 0.1;
        graphComponent.fitGraphBounds([marginY, marginX]);
        setFitMode("screen");
      } else {
        // Switch to fit to width
        await applyGraphZoom(graphComponent, {
          mode: "comfortable",
          animated: false,
          minZoom: 1,
          maxZoom: 10,
          centerToNode: true,
        });
        setFitMode("width");
      }
    }
  };

  return (
    <>
      <LegendMessageModal
        title="Legend"
        message="Would you like to include a legend?"
        okButtonCallback={() => {
          setShowModal(false);
          onAction(true);
        }}
        cancelButtonCallback={() => {
          setShowModal(false);
          onAction(false);
        }}
        isOpen={showModal}
        cancelButtonText="NO"
        okButtonText="YES"
        disableCloseBtn
      />
      <div className="flex items-center">
        {/* Toggle */}
        {!hideViewToggle && <div className="flex items-center">
          <CustomToggle
            checked={view === ViewMode.Table}
            onChange={onSwitchView}
            checkedChildren="Table"
            unCheckedChildren="Shape"
          />
        </div>}

        {/* Separator */}
        {!hideViewToggle && <div className="w-px h-16 border-r border-reg-gray-200 mx-6"></div>}

        {/* PDF, Image, Print */}
        {!hideExportButtons && <div className="flex items-center gap-3">
          <button className="reg-icon-button" onClick={handlePdfButtonClick}>
            <Whisper placement="top" speaker={<Tooltip>Export as PDF</Tooltip>}>
              <div>
                <img
                  src={export_as_pdf}
                  alt="Export as PDF"
                />
              </div>
            </Whisper>
          </button>

          <button className="reg-icon-button" onClick={onPngExport}>
            <Whisper
              placement="top"
              speaker={<Tooltip>Export as Image</Tooltip>}
            >
              <div>
                <img
                  src={export_as_image}
                  alt="Export as Image"
                />
              </div>
            </Whisper>
          </button>

          <button className="reg-icon-button" onClick={handlePrintButtonClick}>
            <Whisper placement="top" speaker={<Tooltip>Print</Tooltip>}>
              <div>
                <img src={print_icon} alt="Print" />
              </div>
            </Whisper>
          </button>
        </div>}

        {/* Separator */}
        {!hideExportButtons && <div className="w-px h-[60px] border-r border-reg-gray-300 mx-6"></div>}

        {/* Zoom Controls */}
        {!hideZoomControls && (
          <div className='flex items-center gap-2'>
            <button
              className='reg-icon-button reg-button-transparent'
              onClick={() => ICommand.INCREASE_ZOOM.execute(null, graphComponent)}
            >
              <Whisper placement='top' speaker={<Tooltip>Zoom In</Tooltip>}>
                <div>
                  <ZoomInIcon className='w-5 h-5 text-reg-gray-600-0.8' />
                </div>
              </Whisper>
            </button>

            <button
              className='reg-icon-button reg-button-transparent'
              onClick={() => ICommand.DECREASE_ZOOM.execute(null, graphComponent)}
            >
              <Whisper placement='top' speaker={<Tooltip>Zoom Out</Tooltip>}>
                <div>
                  <ZoomOutIcon className='w-5 h-5 text-reg-gray-600-0.8' />
                </div>
              </Whisper>
            </button>

            <button
              className='reg-icon-button reg-button-transparent'
              onClick={handleFitToMode}
            >
              <Whisper
                placement='top'
                speaker={<Tooltip>{fitMode === "width" ? "Fit to Screen" : "Fit to Width"}</Tooltip>}
              >
                <div>
                  {fitMode === "width" ? (
                    <FitToScreenIcon className='w-5 h-5 text-reg-gray-600-0.8' />
                  ) : (
                    <FitToWidthIcon className='w-5 h-5 text-reg-gray-600-0.8' />
                  )}
                </div>
              </Whisper>
            </button>

            <button
              className={`reg-icon-button reg-button-transparent ${
                !isFullscreen ? "" : "reg-primary-button-attention min-w-[unset]"
              }`}
              onClick={() => toggleFullscreen()}
            >
              <Whisper
                placement='topEnd'
                speaker={<Tooltip>{isFullscreen ? "Exit Full Screen" : "Full Screen"}</Tooltip>}
              >
                <div>
                  {isFullscreen ? (
                    <HiArrowsPointingIn className='w-5 h-5 text-reg-gray-600-0.8' />
                  ) : (
                    <HiArrowsPointingOut className='w-5 h-5 text-reg-gray-600-0.8' />
                  )}
                </div>
              </Whisper>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default memo(Toolbar);
