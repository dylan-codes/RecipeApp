import React from "react";
import classes from "./UserInput.module.css";

const UserInput = ({ ingredient, onRemove }) => {
  let ingredientTitle =
    ingredient.value.charAt(0).toUpperCase() +
    ingredient.value.slice(1).toLowerCase();

  return (
    <li className={classes.ingredient} onClick={onRemove}>
      <span className={classes.food_image}>&nbsp;</span>
      <span>{ingredientTitle}</span>
      <button className={classes.button} onClick={onRemove}>
        <strong>X</strong>
      </button>
    </li>
  );
};

export default UserInput;
