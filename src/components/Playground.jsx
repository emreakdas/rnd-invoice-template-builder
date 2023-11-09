import componentsData from "../data/components-data.json";
import { useEffect } from "react";
import { useAppContext } from "../context";
import { Rnd } from "react-rnd";

function Playground({ windowSize, style, setEnablePan }) {
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
    setEnablePan(true);
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
    <div id="playground-inside" style={style}>
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
            onDragStart={() => setEnablePan(false)}
            onDragStop={(e, d) => handleOnDragStop(d, key)}
            onResizeStop={(e, direction, ref) => handleOnResizeStop(ref, key)}
          >
            {componentsData[key]}
          </Rnd>
        );
      })}
    </div>
  );
}

export default Playground;
