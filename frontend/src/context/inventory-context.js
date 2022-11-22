import { createContext } from "react";

const InventoryContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
});

export default InventoryContext;