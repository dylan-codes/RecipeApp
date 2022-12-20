import { useState, useContext } from "react";
import Card from "../components/UI/Card";
import AddRecipeUI from "../components/AddRecipeUI/AddRecipeUI";
import IngredientSearch from "../components/IngredientSearch/IngredientSearch";
import AuthContext from "../context/auth-context";

import classes from "../components/RecipeCard/RecipeCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import burgerImg from "../images/icons/SVG/burger.svg";
import hotdogImg from "../images/icons/SVG/hotdog.svg";
import missingImg from "../images/icons/SVG/Missing.svg";
import pizzaImg from "../images/icons/SVG/pizza.svg";
import chickenImg from "../images/icons/SVG/chicken.svg";


function AddRecipe() {
  const AuthCtx = useContext(AuthContext);
  const [inputInterface, setInputInterface] = useState("default");
  const [title, setTitle] = useState("Title");
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(missingImg);

  const interfaceChangeHandler = (inputElement) => {
    setInputInterface(inputElement);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const imageChangeHandler = (imageChoice) => {
    switch (imageChoice) {
      case "burger":
        return setImage(burgerImg);
      case "hotdog":
        return setImage(hotdogImg);
      case "pizza":
        return setImage(pizzaImg);
      case "chicken":
        return setImage(chickenImg);
      default:
        return setImage(missingImg);
    }
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const addIngredientHandler = (ingredient) => {
    setIngredientList(() => [...ingredientList, ingredient]);
    console.log(ingredientList);
  };

  const removeIngredientHandler = (id) => {
    setIngredientList((prevIngredientList) =>
      prevIngredientList.filter((ingredient) => {
        // 👇️ remove object that has id equal to ingredientId
        return String(ingredient.id) !== String(id);
      })
    );

    console.log(ingredientList);
  };

  const handleIngredientClick = (e) => {
    e.stopPropagation();
    console.log(e.target.attributes.id.value);
    let ingredientId = e.target.attributes.id.value;
    removeIngredientHandler(ingredientId);
    /* setInputInterface("editIngredient") */
  };

  const addRecipeStepHandler = (step) => {
    setRecipeSteps(() => [...recipeSteps, step]);
  };

  const submitRecipe = async () => {
    console.log(recipeSteps)
    console.log(JSON.stringify({name: title, steps: recipeSteps, ingredients: ingredientList, description: description, image: image }))
    try {
      const response = await fetch("/api/recipes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${AuthCtx.user.token}` },
        body: JSON.stringify({name: title, steps: recipeSteps, ingredients: ingredientList, description: description, image: image })
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <>
      <div className="addrecipe-preview">
        <h4 className="addrecipe-preview-header">Recipe Preview</h4>
        <Card>
          <div className={classes["search_header"]}>
            <h3 onClick={() => interfaceChangeHandler("title")}>{title}</h3>
            <a className={classes["favorite_star"]}>
              <FontAwesomeIcon icon={faStar} />
            </a>
          </div>
          <div className={classes["search_info"]}>
            <div className={classes.column1}>
              <div className={classes.imageContent}>
                <img
                  className={classes.imageContent}
                  src={image}
                  alt={"Food"}
                  onClick={() => interfaceChangeHandler("image")}
                ></img>
              </div>
              <div
                className={classes.description}
                onClick={() => interfaceChangeHandler("description")}
              >
                <h4>Description:</h4>
                <hr />
                <p className="dont-break-out-of-div">{description}</p>
              </div>
            </div>
            <div className={classes.column2}>
              <div
                className={classes["ingredients_container"]}
                onClick={() => interfaceChangeHandler("ingredients")}
              >
                <h4>Ingredients:</h4>
                <ol type="1" className={classes["ingredient_list"]}>
                  {ingredientList.map((ingredient) => {
                    return (
                      <li
                        id={Math.random()}
                        onClick={(e) => handleIngredientClick(e)}
                      >
                        {ingredient.name + " (" + ingredient.amount + ")"}
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div
                className={classes.recipe}
                onClick={() => interfaceChangeHandler("recipe")}
              >
                <h4>Recipe:</h4>
                <ol>
                  {recipeSteps.map((step) => {
                    return (
                      <li
                        id={Math.random()}
                        onClick={(e) => console.log("clicked recipe step!")}
                      >
                        {step}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Card>
        <div className="addrecipe-button">
          <button className="btn" onClick={submitRecipe}>Add Recipe</button>
        </div>
      </div>
      <div className="addrecipe-form">
        <AddRecipeUI
          inputInterface={inputInterface}
          onImageChange={imageChangeHandler}
          onTitleChange={titleChangeHandler}
          onDescriptionChange={descriptionChangeHandler}
          addIngredientHandler={addIngredientHandler}
          removeIngredientHandler={removeIngredientHandler}
          recipeSteps={recipeSteps}
          addRecipeStepHandler={addRecipeStepHandler}
        />
      </div>
    </>
  );
}

export default AddRecipe;
