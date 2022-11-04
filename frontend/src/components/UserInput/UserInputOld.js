import React from "react";
import classes from './UserInput.module.css'

const UserInput = ({ handleInputChange, onRemove }) => {

    return (
        <li>
            <div>
                <input onChange={handleInputChange}/>
                <button className={classes.button} onClick={onRemove}>-</button>
            </div>
        </li>
    )
}

export default UserInput;