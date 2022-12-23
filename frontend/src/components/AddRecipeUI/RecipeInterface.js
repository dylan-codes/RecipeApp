import { useState } from "react";
import classes from "./AddRecipeUI.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const RecipeInterface = ({ recipeSteps, addRecipeStepHandler }) => {
  const [recipeStep, setRecipeStep] = useState("");
  const [validationError, setValidationError] = useState(false)

  const stepChangeHandler = (event) => {
    setRecipeStep(event.target.value);
  };

  const submitRecipeStepOnEnter = (event) => {
    if (
      event.keyCode === 13 &&
      event.shiftKey === false
    ) {
      submitRecipeStep(event);
    }
  };

  const submitRecipeStep = (event) => {
    event.preventDefault();

    if (recipeStep.trim().length > 0) {
      addRecipeStepHandler(recipeStep);
      setRecipeStep("");
      setValidationError(false)
    } else {
      setValidationError(true)
    }
  };

  return (
    <>
      <h1>Enter recipe step {recipeSteps.length + 1}:</h1>
      <form onSubmit={submitRecipeStep}>
        <textarea
          className={classes["addRecipe_textarea"]}
          placeholder={validationError ? "Please enter a recipe step." : "Recipe"}
          onChange={stepChangeHandler}
          onKeyDown={submitRecipeStepOnEnter}
          value={recipeStep}
        />
        <button className={classes["recipeInterface_addStep"]} type="submit">
          <FontAwesomeIcon icon={faPencil} size="xl" />
        </button>
      </form>
      
    </>
  );
};

export default RecipeInterface;
