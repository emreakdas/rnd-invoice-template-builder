import { DropdownMenu, Button } from "@radix-ui/themes";
import { useAppContext } from "../context";
import componentsData from "../data/components-data.json";
import { memo } from "react";

const ComponentDropdown = memo(function ComponentDropdown() {
  const {selectedComponents, selectHandle} = useAppContext();  
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            outline: "none",
            zIndex: 1,
          }}
          size={"3"}
          variant="classic"
          type="button"
        >
          Components
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {Object.keys(componentsData).map((key) => (
          <DropdownMenu.Item
            key={key}
            onClick={() => selectHandle(key)}
            style={{
              textDecoration:
                selectedComponents.find((item) => item.key == key) &&
                "line-through",
            }}
          >
            {componentsData[key]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});

export default ComponentDropdown;
