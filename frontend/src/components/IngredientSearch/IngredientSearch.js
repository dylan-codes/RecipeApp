import React, { useState, useContext, useEffect } from "react";
import classes from "./IngredientSearch.module.css";

const IngredientSearch = ({ addIngredient, removeIngredient }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fetchController, setFetchController] = useState({});
  const [ingredientList, setIngredientList] = useState([]);

  const selectDropdownIngredient = (parameter) => (event) => {
    console.log("hello");
    console.log(parameter);
    event.preventDefault();
    if (searchResults.includes(ingredientName)) {
      submitIngredient();
      setIngredientName("");
    } else {
    }
  };

  const submitIngredient = (event) => {
    event.preventDefault();
    console.log(searchResults.includes(ingredientName), ingredientName);
    if (searchResults.includes(ingredientName.toLowerCase())) {
      /*       setIngredientList([
        ...ingredientList,
        {
          id: Math.random(),
          value:
            ingredientName.charAt(0).toUpperCase() +
            ingredientName.slice(1).toLowerCase() +
            " (" +
            ingredientAmount +
            ") ",
        },
      ]); */

      let ingredient = {
        value:
          ingredientName.charAt(0).toUpperCase() +
          ingredientName.slice(1).toLowerCase() +
          " (" +
          ingredientAmount +
          ") ",
        id: Math.random(),
      };

      addIngredient(ingredient);
      setIngredientName("");
      setSearchResults([]);
    } else {
    }
  };

  const removeIngredientHandler = (deletedIngredient) => (event) => {
    const newArray = ingredientList.filter(
      (recipe) => recipe.id !== deletedIngredient.id
    );

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

    setIngredientName(event.target.value);
    if (event.target.value.trim() !== "") {
      fetch(`/api/ingredients?ingredient=${ingredientName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({ ingredient: ingredientName }),
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

  const ingredientAmountHandler = (event) => {
    setIngredientAmount(event.target.value);
  };

  return (
    <form onSubmit={submitIngredient}>
      <div className={classes["form_content"]}>
        <input
          value={ingredientName}
          onBlur={() => {
            /*   setSearchResults([]); */
          }}
          onChange={ingredientInputHandler}
          placeholder="Ingredient Name"
        ></input>
        {searchResults.length > 0 && (
          <div className={classes["ingredient_dropdown"]}>
            <ul>
              {searchResults.map((result) => {
                return (
                  <li
                    value={result}
                    key={result}
                    onClick={() => selectDropdownIngredient(result)}
                  >
                    {result}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <input
          value={ingredientAmount}
          onBlur={() => {
            /*   setSearchResults([]); */
          }}
          onChange={ingredientAmountHandler}
          placeholder="Amount"
        ></input>
        <button className="btn" type="submit">
          Add Ingredient
        </button>
      </div>
    </form>
  );
};

export default IngredientSearch;