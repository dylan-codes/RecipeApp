import { useReducer, useEffect } from "react";

import InventoryContext from "./inventory-context";

const defaultInventoryState = {
  items: [],
};

const inventoryReducer = (state, action) => {
  if (action.type === "FILL") {
    return {
      items: action.items
    }
  }
  if (action.type === "ADD") {
    let updatedInventory = [...state.items];
    updatedInventory.push(action.item);
    localStorage.setItem("saved_ingredients", JSON.stringify(updatedInventory));
    return {
      items: updatedInventory,
    };
  }
  if (action.type === "REMOVE") {
    let inventory = [...state.items];
    let updatedInventory = inventory.filter(
      (ingredient) => ingredient !== action.item
    );
    localStorage.setItem("saved_ingredients", JSON.stringify(updatedInventory));
    return {
      items: updatedInventory,
    };
  }
  if (action.type === "CLEAR") {
    localStorage.removeItem("saved_ingredients");
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

  useEffect(() => {
    const ingredients = JSON.parse(localStorage.getItem('saved_ingredients'))

    if (ingredients) {
      dispatchInventoryAction({ type: 'FILL', items: ingredients })
    }
  }, [])

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
  
  console.log('Inventory state: ', inventoryState)

  return (
    <InventoryContext.Provider value={inventoryContext}>
      {props.children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
