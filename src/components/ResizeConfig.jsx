import { Box, Card, Flex, TextField, Button, Text } from "@radix-ui/themes";
import { useAppContext } from "../context";

function ResizeConfig() {
  const { setResizeConfig } = useAppContext();

  function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    setResizeConfig({
        width: formData.get("width") + "px",
        height: formData.get("height") + "px"
    });
  }

  return (
    <div className="playground">
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          maxWidth: "300px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            display: "block",
          }}
          size={"4"}
          mb={"2"}
        >
          Resizable and Draggable Invoice Template Builder
        </Text>
        <Card
          style={{
            background: "white",
            boxShadow: "0 0 20px 0 rgba(0,0,0,0.7)",
          }}
        >
          <Flex gap={"2"} mb={"1"}>
            <Box grow={"1"}>
              <TextField.Root>
                <TextField.Input name="width" type="number" placeholder="width" min={600} max={2500} required />
              </TextField.Root>
            </Box>
            <Box grow={"1"}>
              <TextField.Root>
                <TextField.Input name="height" type="number" placeholder="height" min={600} max={2500} required />
              </TextField.Root>
            </Box>
          </Flex>
          <Button variant="classic" style={{ width: "100%" }}>
            create playground
          </Button>
        </Card>
      </form>
    </div>
  );
}

export default ResizeConfig;
