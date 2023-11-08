import { useRef } from "react";
import { Button } from "@radix-ui/themes";
import ComponentDropdown from "./components/ComponentDropdown";
import Playground from "./components/Playground";
import { useAppContext } from "./context";
import { toast } from "sonner"

function App() {
  const { selectedComponents } = useAppContext(); 
  const windowSize = useRef(0);

  function handlePreview() {
    if(selectedComponents.length === 0){
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
      <Playground windowSize={windowSize} />
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
