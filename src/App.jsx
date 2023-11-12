import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import ComponentDropdown from "./components/ComponentDropdown";
import Playground from "./components/Playground";
import { useAppContext } from "./context";
import { toast } from "sonner";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ResizeConfig from "./components/ResizeConfig";

function App() {
  const [resizeApp, setResizeApp] = useState(true);
  const [enablePan, setEnablePan] = useState(false);
  const { selectedComponents, resizeConfig } = useAppContext();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1200) {
        setResizeApp(false);
      } else {
        setResizeApp(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handlePreview() {
    if (selectedComponents.length === 0) {
      toast.info("Cannot preview without adding components.");
      return;
    }

    console.log({
      window: resizeConfig,
      components: selectedComponents,
    });
  }

  if (!resizeApp) {
    return (
      <div className="playground">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            maxWidth: "300px",
            transform: "translate(-50%, -50%)",
            padding: "12px",
            textAlign: "center",
            color: "rgba(255,255,255,0.7)"
          }}
        >
          <div style={{marginBottom: 8, color: "#fff"}}>Resizable and Draggable Invoice Template Builder</div>
          <div>To use the application, your window size must be greater than or equal to 1200px.</div>
        </div>
      </div>
    );
  }

  if (resizeConfig === null) {
    return <ResizeConfig />;
  }

  return (
    <div className="playground">
      <ComponentDropdown />
      <TransformWrapper
        limitToBounds={false}
        disabled={enablePan}
        centerOnInit
        initialScale={1}
        minScale={0.5}
        maxScale={1}
      >
        <TransformComponent
          wrapperStyle={{ width: "100vw", height: "100vh" }}
          contentStyle={{ width: "100vw", height: "100vh" }}
        >
          <Playground
            style={resizeConfig}
            setEnablePan={setEnablePan}
          />
        </TransformComponent>
      </TransformWrapper>
      <Button
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          outline: "none",
          zIndex: 1,
        }}
        size={"4"}
        color="blue"
        variant="classic"
        type="button"
        onClick={handlePreview}
      >
        Preview
      </Button>
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          color: "rgba(255,255,255,0.5)",
          fontSize: "13px",
        }}
      >
        The project is being developed
      </div>
    </div>
  );
}

export default App;
