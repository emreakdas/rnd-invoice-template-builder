import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function ContextProvider({ children }){
    const [selectedComponents, setSelectedComponents] = useState([]);

    function selectHandle(key) {
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
    }

    return <Context.Provider value={{selectedComponents, setSelectedComponents, selectHandle}}>{children}</Context.Provider>;
}

export const useAppContext = () => useContext(Context);