import React from "react";
import classes from './UserInput.module.css'

const UserInput = ({ recipe, onRemove }) => {

    return (
        <li className={classes.ingredient} onClick={onRemove}>
            <span className={classes.food_image}>&nbsp;</span>
            <span>{recipe.value}</span>
            <button className={classes.button} onClick={onRemove}><strong>X</strong></button>
        </li>
    )
}

export default UserInput;