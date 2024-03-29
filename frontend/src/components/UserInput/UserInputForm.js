import React, { useState, useContext, useEffect } from "react";
import UserInput from "./UserInput";
import classes from "./UserInputForm.module.css";
import InventoryContext from "../../context/inventory-context";
import AuthContext from "../../context/auth-context";

const UserInputForm = ({ onSubmit, onAddIngredient }) => {
  const inventoryCtx = useContext(InventoryContext);
  const AuthCtx = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [ingredientList, setIngredientList] = useState(
    inventoryCtx.items.map((ingredient) => {
      return { id: Math.random(), value: ingredient };
    })
  );
  const [searchResults, setSearchResults] = useState([]);
  const [fetchController, setFetchController] = useState({});
  const [error, setError] = useState(null);

  const submitDropDownIngredient = (result) => {
    setIngredientList([
      ...ingredientList,
      {
        id: Math.random(),
        value: result,
      },
    ]);
    setUserInput("");
    setSearchResults([]);
    setError(false);
  };

  const addIngredientHandler = (event) => {
    if (event) event.preventDefault();
    console.log("Attempting to submit")
    if (searchResults.includes(userInput.toLowerCase())) {
      
      inventoryCtx.addItem(userInput);

      setIngredientList([
        ...ingredientList,
        {
          id: Math.random(),
          value: userInput,
        },
      ]);
      setUserInput("");
      setSearchResults([]);
      setError(false);
    } else {
      console.log(error)
      setError(true)
    }
  };

  const removeIngredientHandler = (deletedIngredient) => (event) => {
    const newArray = ingredientList.filter(
      (ingredient) => ingredient.id !== deletedIngredient.id
    );

    inventoryCtx.removeItem(deletedIngredient.value);

    return setIngredientList(newArray);
  };

  const ingredientInputHandler = async (event) => {
    let aborter = new AbortController();
    const signal = aborter.signal;

    if (Object.keys(fetchController).length === 0) {
      setFetchController({
        controller: aborter,
        signal,
      });
    } else {
      fetchController.controller.abort();
      setFetchController({
        controller: aborter,
        signal,
      });
    }

    setUserInput(event.target.value);
    if (event.target.value.trim() !== "") {
      fetch(`/api/ingredients?ingredient=${userInput}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({ ingredient: userInput }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(
            data.map((result) => {
              return result.ingredient;
            })
          );
        })
        .catch((error) => {
          /* console.log(error) */
        });
    } else {
      setSearchResults([]);
    }
  };

  const submitIngredients = (event) => {
    fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthCtx.user.token}`,
      },
      body: JSON.stringify({ payload: ingredientList }),
    })
      .then((res) => res.json())
      .then((data) => {
        let payload = data.payload;

        onSubmit(payload);
      });
  };

  const ingredientMap = ingredientList.map((ingredient) => {
    return (
      <UserInput
        key={ingredient.id}
        onRemove={removeIngredientHandler(ingredient)}
        ingredient={ingredient}
      />
    );
  });

  return (
    <div className={classes.container}>
      <form onSubmit={addIngredientHandler}>
        <div className={classes["form_content"]}>
          <input
            value={userInput}
            onBlur={() => {
              /*   setSearchResults([]); */
            }}
            onChange={ingredientInputHandler}
          ></input>
          <button type="submit" className={classes.addButton}>
            +
          </button>
          {searchResults.length > 0 && (
            <div className={classes["ingredient_dropdown"]}>
              <ul>
                {searchResults.map((result) => {
                  return (
                    <li
                      value={result}
                      key={result}
                      onClick={() => submitDropDownIngredient(result)}
                    >
                      {result}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </form>
      <ul className={classes.ingredientList}>{ingredientMap}</ul>

      <button className={classes.btn} onClick={submitIngredients}>
        Submit Order
      </button>
      {error && <p className={classes['submit-error']}>Please make sure the ingredient entered is found in the dropdown list.</p>}
    </div>
  );
};

export default UserInputForm;
