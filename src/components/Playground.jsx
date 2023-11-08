import componentsData from "../data/components-data.json";
import { Fragment, createRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { useAppContext } from "../context";

function Playground({ windowSize }) {
  const { selectedComponents, setSelectedComponents } = useAppContext();
  const [resizeNode, setResizeNode] = useState(false);

  useEffect(() => {
    function handleResize() {
      const { offsetHeight, offsetWidth } =
        document.getElementById("playground-inside");
      windowSize.current = { width: offsetWidth, heigth: offsetHeight };
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleOnResizeStart() {
    flushSync(() => {
      setResizeNode(true);
    });
  }

  function handleOnResizeStop(ref, key) {
    setResizeNode(false);
    setSelectedComponents(
      selectedComponents.map((item) => {
        if (item.key === key) {
          (item.width = ref.offsetWidth), (item.heigth = ref.offsetHeight);
        }

        return item;
      })
    );
  }

  function handleOnStop(data, key) {
    setSelectedComponents(
      selectedComponents.map((item) => {
        if (item.key === key) {
          (item.x = data.x), (item.y = data.y);
        }

        return item;
      })
    );
  }

  return (
    <div id="playground-inside">
      {selectedComponents.map(({ key }) => {
        const ref = createRef(null);
        return (
          <Fragment key={key}>
            <Draggable
              disabled={resizeNode}
              nodeRef={ref}
              bounds="parent"
              defaultPosition={{ x: 0, y: 0 }}
              position={null}
              scale={1}
              onStop={(e, data) => handleOnStop(data, key)}
            >
              <div
                ref={ref}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  cursor: "pointer",
                }}
              >
                <Resizable
                  className="box"
                  minWidth={100}
                  minHeight={40}
                  maxWidth={600}
                  onResizeStart={handleOnResizeStart}
                  onResizeStop={(e, direction, ref) =>
                    handleOnResizeStop(ref, key)
                  }
                >
                  {componentsData[key]}
                </Resizable>
              </div>
            </Draggable>
          </Fragment>
        );
      })}
    </div>
  );
}

export default Playground;
