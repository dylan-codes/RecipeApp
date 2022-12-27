import React, { useState, useContext, useEffect } from "react";
import classes from "./IngredientSearch.module.css";

const IngredientSearch = ({ addIngredient, removeIngredient }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fetchController, setFetchController] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const [error, setError] = useState(null);

  const submitDropDownIngredient = (result) => {
    if (ingredientAmount.trim().length > 0) {
      let ingredient = {
        name: result.charAt(0).toUpperCase() + result.slice(1).toLowerCase(),
        amount: ingredientAmount,
      };
  
      addIngredient(ingredient);
  
      setIngredientName("");
      setIngredientAmount("");
      setSearchResults([]);
      setError(false)
    } else {
      setError(true)
    }
  };

  const submitIngredient = (event) => {
    event.preventDefault();
    if (searchResults.includes(ingredientName.toLowerCase()) && ingredientAmount.trim().length > 0) {
      let ingredient = {
        name:
          ingredientName.charAt(0).toUpperCase() +
          ingredientName.slice(1).toLowerCase(),
        amount: ingredientAmount,
      };

      addIngredient(ingredient);
      setIngredientName("");
      setIngredientAmount("");
      setSearchResults([]);
      setError(false)
    } else {
      setError(true)
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
                    onClick={() => submitDropDownIngredient(result)}
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
      {error && <p className={classes['submit-error']}>Please enter a valid ingredient (found in the dropdown) and an amount.</p>}
    </form>
    
  );
};

export default IngredientSearch;
