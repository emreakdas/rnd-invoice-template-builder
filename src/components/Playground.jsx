import componentsData from "../data/components-data.json";
import { useEffect } from "react";
import { useAppContext } from "../context";
import { Rnd } from "react-rnd";
import { memo } from "react";

const Playground = memo(function Playground({ windowSize, setEnablePan }) {
  const { selectedComponents, setSelectedComponents, selectHandle } = useAppContext();

  useEffect(() => {
    function handleResize() {
      const { offsetHeight, offsetWidth } = document.getElementById("playground-inside");
      windowSize.current = { width: offsetWidth, heigth: offsetHeight };
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleOnResizeStop(ref, key) {
    setSelectedComponents(
      selectedComponents.map((item) => {
        if (item.key === key) {
          item.width = ref.offsetWidth;
          item.heigth = ref.offsetHeight;
        }

        return item;
      })
    );
  }

  function handleOnDragStop(data, key) {
    setSelectedComponents(
      selectedComponents.map((item) => {
        if (item.key === key) {
          item.x = data.x;
          item.y = data.y;
        }

        return item;
      })
    );
    setEnablePan(false);
  }

  function handleKeyDown(e, key) {
    if(e.keyCode === 46){
      selectHandle(key)
    }
  }

  const boxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <div id="playground-inside">
      {selectedComponents.map(({ key }) => {
        return (
          <Rnd
            minWidth="80px"
            minHeight="50px"
            key={key}
            style={boxStyle}
            className="box"
            bounds="parent"
            tabIndex={0} onKeyUp={(e) => handleKeyDown(e, key)}
            onDragStart={() => setEnablePan(true)}
            onDragStop={(e, d) => handleOnDragStop(d, key)}
            onResizeStop={(e, direction, ref) => handleOnResizeStop(ref, key)}
          >
            {componentsData[key]}
          </Rnd>
        );
      })}
    </div>
  );
});

export default Playground;
