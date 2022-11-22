import React, { useState, useContext, useEffect } from "react";
import UserInput from "./UserInput";
import classes from "./UserInputForm.module.css";
import InventoryContext from "../../context/inventory-context";

const UserInputForm = ({ onSubmit, onAddIngredient }) => {
  const [userInput, setUserInput] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [searchResults, setSearchResults] = useState([])
  const [fetchController, setFetchController] = useState({})
  const inventoryCtx = useContext(InventoryContext)
  
  

  const submitUserInput = (parameter) => (event) => {
    console.log(parameter)
    event.preventDefault()
    if (searchResults.includes(userInput)){
      addIngredientHandler();
      setUserInput("");
    } else {
      
    }
  }

  const addIngredientHandler = (event) => {
    event.preventDefault()

    if (searchResults.includes(userInput.toLowerCase())){
      inventoryCtx.addItem(userInput)

      setRecipeList([
        ...recipeList,
        {
          id: Math.random(),
          value: userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase(),
        },
      ]);
      setUserInput("");
      setSearchResults([])
    } else {
  
    }
  };

  const removeIngredientHandler = (deletedIngredient) => (event) => {
    const newArray = recipeList.filter((recipe) => recipe.id !== deletedIngredient.id);
    
    inventoryCtx.removeItem(deletedIngredient.value)

    return setRecipeList(newArray);
  };

  const ingredientInputHandler = async (event) => {
    let aborter = new AbortController();
    const signal = aborter.signal;

    if (Object.keys(fetchController).length === 0){
      setFetchController({
        controller: aborter,
        signal
      })
    } else {
      fetchController.controller.abort();
      setFetchController({
        controller: aborter,
        signal
      })
    }

    setUserInput(event.target.value);
    console.log(userInput)
    if (event.target.value.trim() !== ""){
      fetch(`/api/ingredients?ingredient=${userInput}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: signal,
        body: JSON.stringify({ingredient: userInput}),
      }).then(res => res.json()).then(data => {
        setSearchResults(data.map(result => {
          return (
            result.ingredient
          )
        }))

      })
    } else {
      setSearchResults([])
    }
  };

  const submitIngredients = (event) => {
    fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({payload: recipeList}),
    }).then(res => res.json()).then(data => {
      let payload = data.payload;

      onSubmit(payload)
    });
  };

  const recipeMap = recipeList.map((recipe) => {

    return (
      <UserInput
        key={recipe.id}
        onRemove={removeIngredientHandler(recipe)}
        recipe={recipe}
      />
    );
  });

  return (
    <div className={classes.container}>
      <form onSubmit={addIngredientHandler}>
        <div className={classes["form_content"]}>
          <input value={userInput} onBlur={() => {setSearchResults([])}} onChange={ingredientInputHandler}></input>
          <button type="submit" className={classes.addButton}>
            +
          </button>
          {(searchResults.length > 0) && <div className={classes["ingredient_dropdown"]}>
            <ul>
              {searchResults.map(result => {return (
                <li key={result} onClick={() => submitUserInput(result)}>{result}</li>
              )})}
            </ul>
          </div>}
        </div>
      </form>
      <ul className={classes.ingredientList}>{recipeMap}</ul>

      <button className={classes.btn} onClick={submitIngredients}>
        Submit Order
      </button>
    </div>
  );
};

export default UserInputForm;
