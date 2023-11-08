import componentsData from "../data/components-data.json";
import { useEffect } from "react";
import { useAppContext } from "../context";
import { Rnd } from "react-rnd";

function Playground({ windowSize }) {
  const { selectedComponents, setSelectedComponents } = useAppContext();

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

  function handleOnResizeStop(ref, key) {
    setSelectedComponents(
      selectedComponents.map((item) => {
        if (item.key === key) {
          (item.width = ref.offsetWidth), (item.heigth = ref.offsetHeight);
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
