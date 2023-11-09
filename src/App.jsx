import { useRef, useMemo, useState } from "react";
import { Button } from "@radix-ui/themes";
import ComponentDropdown from "./components/ComponentDropdown";
import Playground from "./components/Playground";
import { useAppContext } from "./context";
import { toast } from "sonner";
import usePanZoom from "use-pan-and-zoom";

function App() {
  const [enablePan, setEnablePan] = useState(true);
  const memoPan = useMemo(() => {
    return {
      panOnDrag: enablePan,
      disableWheel: !enablePan,
      enablePan,
      enableZoom: enablePan,
      preventClickOnPan: enablePan,
      requireCtrlToZoom: true,
    };
  }, [enablePan]);

  const { transform, setContainer, panZoomHandlers } = usePanZoom(memoPan);
  const { selectedComponents } = useAppContext();
  const windowSize = useRef(0);

  function handlePreview() {
    if (selectedComponents.length === 0) {
      toast.info("Bileşen eklemeden önizleme yapılamaz.");
      return;
    }

    console.log({
      window: windowSize.current,
      components: selectedComponents,
    });
  }

  return (
    <div
      className="playground"
      ref={(el) => {
        setContainer(el);
      }}
      style={{ touchAction: "none" }}
      {...panZoomHandlers}
    >
      <ComponentDropdown />
      <Playground
        style={{ transform }}
        windowSize={windowSize}
        setEnablePan={setEnablePan}
      />
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
        Önizle
      </Button>
    </div>
  );
}

export default App;
