import React from "react";
import classes from './UserInput.module.css'

const UserInput = ({ recipeList }) => {

    return (
        <li>
            <div>
                <input/>
                <button className={classes.button}>+</button>
            </div>
        </li>
    )
}

export default UserInput;