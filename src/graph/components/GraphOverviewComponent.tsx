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

import { GraphOverviewComponent } from "@yfiles/yfiles";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Whisper } from "rsuite";
import RightArrowIcon from "../../assets/icons/RightArrowIcon";
import { resetOverviewWindowPositionOnCollapse } from "../../helpers/tpGraphHelper";
import { GraphComponentContext } from "../lib/GraphComponentContext";
import "./GraphOverviewComponent.scss";

const ReactGraphOverviewComponent = () => {
  const [show, setShow] = useState(true);
  const [dragable, setDragable] = useState(false);

  const draggableElementRef = useRef<
    Draggable & { state: { x: number; y: number } }
  >(null);

  const [bounds, setBounds] = useState({
    top: -600,
    left: 0,
    right: 1600,
    bottom: 200,
  });

  const myWidth: number = 1920;
  const myHeight: number = 1080;

  const updateBounds = () => {
    const screenWidth = window.innerWidth / myWidth;
    const screenHeight = window.innerHeight / myHeight;

    const top = -600 * screenHeight;
    const left = 0;
    const right = 1600 * screenWidth;
    const bottom = 200 * screenHeight;

    setBounds({ top, left, right, bottom });
  };

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  const defaultPosition = useMemo(() => {
    return { x: bounds.left, y: (-50 * window.innerHeight) / 1080 };
  }, [bounds]);

  const onChange = (e) => {
    if (show) {
      resetOverviewWindowPositionOnCollapse(
        { ...defaultPosition, y: bounds.bottom },
        draggableElementRef
      );
    } else if (draggableElementRef.current?.state.y > defaultPosition.y) {
      resetOverviewWindowPositionOnCollapse(
        defaultPosition,
        draggableElementRef
      );
    }
    e.stopPropagation();
    setShow(!show);
  };

  const onDragableChange = (e) => {
    e.stopPropagation();
    setDragable(!dragable);
  };

  const [graphComponent] = useContext(GraphComponentContext);

  const div = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (div.current && graphComponent) {
      const overview = new GraphOverviewComponent(div.current, graphComponent);
      return () => {
        overview.cleanUp();
      };
    }
  }, [graphComponent]);

  return (
    <Draggable
      ref={draggableElementRef}
      disabled={dragable}
      bounds={bounds}
      defaultPosition={defaultPosition}
    >
      <div className={`overview-container ${show ? "box-shadow-01" : ""}`}>
        <Whisper followCursor speaker={<div></div>}>
          <div
            className="overview-title text-14-semibold text-reg-gray-800 w-[200px] cursor-pointer"
          >
            Overview
            <button
              className="ml-auto gray-transition-with-bg cursor-pointer w-8 h-8 flex justify-center items-center rounded-md"
              onClick={onChange}
            >
              <RightArrowIcon
                className={`w-4 h-4 transform transition-all duration-300 ${
                  show ? "-rotate-90 " : "rotate-90"
                }`}
              />
            </button>
          </div>
        </Whisper>
        <div
          hidden={!show}
          className={`graph-overview-component`}
          ref={div}
          onMouseEnter={onDragableChange}
          onMouseLeave={onDragableChange}
        />
      </div>
    </Draggable>
  );
};
export default memo(ReactGraphOverviewComponent);
