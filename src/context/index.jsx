import { useCallback } from "react";
import { useMemo } from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function ContextProvider({ children }){
    const [selectedComponents, setSelectedComponents] = useState([]);
    const [resizeConfig, setResizeConfig] = useState(null);

    const selectHandle = useCallback((key) => {
        if (!selectedComponents.find((item) => item.key == key)) {
        setSelectedComponents([
            ...selectedComponents,
            {
            key,
            },
        ]);
        } else {
        setSelectedComponents(
            selectedComponents.filter((item) => item.key != key)
        );
        }
    }, [selectedComponents]);

    const value = useMemo(() => {
        return {selectedComponents, setSelectedComponents, selectHandle, resizeConfig, setResizeConfig};
    }, [selectedComponents, selectHandle, resizeConfig])

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useAppContext = () => useContext(Context);