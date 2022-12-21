import { useState } from "react";
import classes from "./AddRecipeUI.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const RecipeInterface = ({ recipeSteps, addRecipeStepHandler }) => {
  const [recipeStep, setRecipeStep] = useState("");

  const stepChangeHandler = (event) => {
    setRecipeStep(event.target.value);
  };

  const submitRecipeStep = (event) => {
    event.preventDefault();

    let step = recipeStep;
    

    addRecipeStepHandler(step);
    setRecipeStep("")
  };

  return (
    <>
      <h1>Enter recipe step {recipeSteps.length + 1}:</h1>
      <form onSubmit={submitRecipeStep}>
        <textarea
          className={classes["addRecipe_textarea"]}
          placeholder="Recipe"
          onChange={stepChangeHandler}
          value={recipeStep}
        />
        <button className={classes["recipeInterface_addStep"]} type="submit">
          <FontAwesomeIcon icon={faPencil} size="xl"/> 
        </button>
      </form>
    </>
  );
};

export default RecipeInterface;
