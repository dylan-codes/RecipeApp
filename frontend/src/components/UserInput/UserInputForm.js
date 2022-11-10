import React, { useState } from "react";
import UserInput from "./UserInput";
import classes from "./UserInputForm.module.css";

const UserInputForm = () => {
  const [userInput, setUserInput] = useState("");
  const [recipeList, setRecipeList] = useState([
    {
      id: Math.random(),
      value: "Chicken",
    },
    {
      id: Math.random(),
      value: "Pickles",
    },
    {
      id: Math.random(),
      value: "Chicken",
    },
    {
      id: Math.random(),
      value: "Chicken",
    },
    {
      id: Math.random(),
      value: "Chicken",
    },
  ]);

  const addIngredientHandler = (event) => {
    console.log("hello");
    event.preventDefault();

    setRecipeList([
      ...recipeList,
      {
        id: Math.random(),
        value: userInput,
      },
    ]);

    setUserInput("");
  };

  const removeIngredientHandler = (id) => (event) => {
    const newArray = recipeList.filter((recipe) => recipe.id !== id);

    return setRecipeList(newArray);
  };

  const ingredientInputHandler = (event) => {
    setUserInput(event.target.value);
  };

  const submitIngredients = (event) => {
    fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({payload: recipeList}),
    }).then(res => res.json()).then(data => {
      let payload = data.payload;
      console.log(payload)
    });
  };

  const recipeMap = recipeList.map((recipe) => {
    return (
      <UserInput
        key={recipe.id}
        onRemove={removeIngredientHandler(recipe.id)}
        recipe={recipe}
      />
    );
  });

  return (
    <div className={classes["form_content"]}>
      <form onSubmit={addIngredientHandler}>
        <input value={userInput} onChange={ingredientInputHandler}></input>
        <button type="submit" className={classes.addButton}>
          +
        </button>
      </form>
      <ul className={classes.ingredientList}>{recipeMap}</ul>

      <button className={classes.btn} onClick={submitIngredients}>
        Submit Order
      </button>
    </div>
  );
};

export default UserInputForm;
