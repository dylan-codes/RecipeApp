import { useReducer } from "react";

import InventoryContext from "./inventory-context";

const defaultInventoryState = {
  items: [],
};

const inventoryReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedInventory = [...state.items];
    updatedInventory.push(action.item);
    return {
      items: updatedInventory,
    };
  }
  if (action.type === "REMOVE") {
    let inventory = [...state.items];
    console.log(action.item);
    let updatedInventory = inventory.filter(
      (ingredient) => ingredient !== action.item
    );
    console.log(updatedInventory);
    return {
      items: updatedInventory,
    };
  }
  if (action.type === "CLEAR") {
    return {
      items: [],
    };
  }
  return defaultInventoryState;
};

const InventoryProvider = (props) => {
  const [inventoryState, dispatchInventoryAction] = useReducer(
    inventoryReducer,
    defaultInventoryState
  );

  const addItemToInventory = (item) => {
    dispatchInventoryAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchInventoryAction({ type: "REMOVE", item: item });
  };

  const clearItemsFromCartHandler = () => {
    dispatchInventoryAction({ type: "CLEAR" })
  }

  const inventoryContext = {
    items: inventoryState.items,
    addItem: addItemToInventory,
    removeItem: removeItemFromCartHandler,
    clear: clearItemsFromCartHandler
  };

  return (
    <InventoryContext.Provider value={inventoryContext}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
