import React, {useState} from "react";
import UserInput from './UserInput'
import classes from "./UserInputForm.module.css"

const UserInputForm = () => {
    const [recipeList, setRecipeList] = useState(["Chicken", "Lasagna Noodles", "Pasta Sauce"]);
    const inputMap = recipeList.map(recipe => {
        console.log(recipe)
        return(
            <>
                <UserInput recipe={recipe}/>
            </>
        )
    })

    return (
        <>
            <ul>
                {inputMap}
            </ul>
            <button className={classes.addButton}>+</button>
        </>
    )
}

export default UserInputForm;