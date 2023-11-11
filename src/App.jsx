import { useRef, useState } from "react";
import { Button } from "@radix-ui/themes";
import ComponentDropdown from "./components/ComponentDropdown";
import Playground from "./components/Playground";
import { useAppContext } from "./context";
import { toast } from "sonner";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function App() {
  const [enablePan, setEnablePan] = useState(false);
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
    <div className="playground">
      <ComponentDropdown />
      <TransformWrapper limitToBounds={false} disabled={enablePan} centerOnInit initialScale={0.5} minScale={0.5}>
        <TransformComponent wrapperStyle={{width: "100vw", height: "100vh"}} contentStyle={{width: "100vw", height: "100vh"}} >
          <Playground windowSize={windowSize} setEnablePan={setEnablePan} />
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
        Önizle
      </Button>
    </div>
  );
}

export default App;
