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
import TutorialCard from "../components/TutorialCard/TutorialCard";

function AddRecipe() {
  const AuthCtx = useContext(AuthContext);
  const [inputInterface, setInputInterface] = useState("default");
  const [title, setTitle] = useState("Edit Title");
  const [ingredientList, setIngredientList] = useState([]);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(missingImg);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (!ingredientList) setRecipeSteps([ingredient]); // If it's the first iteration.
    setIngredientList(() => [...ingredientList, ingredient]);
  };

  const removeIngredientHandler = (id) => {
    setIngredientList((prevIngredientList) =>
      prevIngredientList.filter((ingredient) => {
        // 👇️ remove object that has id equal to ingredientId
        return String(ingredient.id) !== String(id);
      })
    );
  };

  const handleIngredientClick = (e) => {
    e.stopPropagation();
    let ingredientId = e.target.attributes.id.value;
    removeIngredientHandler(ingredientId);
    /* setInputInterface("editIngredient") */
  };

  const addRecipeStepHandler = (step) => {
    if (!recipeSteps) setRecipeSteps([step])
    setRecipeSteps(() => [...recipeSteps, step]);
  };

  const submitRecipe = async () => {
    try {
      if (ingredientList.length === 0 || recipeSteps.length === 0) {
        throw new Error("All input is required");
      }
      const response = await fetch("/api/recipes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthCtx.user.token}`,
        },
        body: JSON.stringify({
          name: title,
          steps: recipeSteps,
          ingredients: ingredientList,
          description: description,
          image: image,
        }),
      });

      if (!response.ok){
        setError(true);
        return;
      }

      const data = await response.json();

      if (data.stack) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <div className="addrecipe-preview">
        <h4 className="addrecipe-preview-header">Recipe Preview</h4>
        <Card key={"PreviewCard"}>
          <div className={classes["search_header"]}>
            <h3 onClick={() => interfaceChangeHandler("title")} className={`addrecipe-title ${inputInterface === "title" ? classes.selected : ''}`}>{title}</h3>
            <a className={classes["favorite_star"]}>
              <FontAwesomeIcon icon={faStar} key={"faStar"}/>
            </a>
          </div>
          <div className={classes["search_info"]}>
            <div className={classes.column1}>
              <div className={classes.imageContent}>
                <img
                  className={`${classes.imageContent} ${inputInterface === "image" ? classes.selected : ''}`}
                  src={image}
                  alt={"Food"}
                  onClick={() => interfaceChangeHandler("image")}
                ></img>
              </div>
              <div
                className={`${classes.description} ${inputInterface === "description" ? classes.selected : ''}`}
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
                <ol type="1" className={`${classes["ingredient_list"]} ${inputInterface === "ingredients" ? classes.selected : ''}`}>
                  {ingredientList.map((ingredient) => {
                    return (
                      <li
                        key={Math.random()}
                        onClick={(e) => handleIngredientClick(e)}
                      >
                        {ingredient.name + " (" + ingredient.amount + ")"}
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div
                className={classes["recipe_container"]}
                onClick={() => interfaceChangeHandler("recipe")}
              >
                <h4>Recipe:</h4>
                <ol className={`${classes["recipe_list"]} ${inputInterface === "recipe" ? classes.selected : ''}`}>
                  {recipeSteps.map((step) => {
                    return (
                      <li
                        key={Math.random()}
                        onClick={() => {console.log("Step Selected")}}
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
          <button className="btn" onClick={submitRecipe}>
            Add Recipe
          </button>
          {error && (
            <span className="error">
              Failed to create! Make sure you have entered all fields.
            </span>
          )}
          {success && (
            <span className="success">Recipe successfully created!</span>
          )}
        </div>
      </div>
      <div className="addrecipe-form">
        <AddRecipeUI
          key={"AddRecipeMenu"}
          inputInterface={inputInterface}
          onImageChange={imageChangeHandler}
          onTitleChange={titleChangeHandler}
          onDescriptionChange={descriptionChangeHandler}
          addIngredientHandler={addIngredientHandler}
          removeIngredientHandler={removeIngredientHandler}
          recipeSteps={recipeSteps}
          addRecipeStepHandler={addRecipeStepHandler}
          title={title}
          description={description}
          
        />
      </div>

      {localStorage.getItem("siteTutorial") === "true" && (
        <TutorialCard
          title={"Bonjour!"}
          subtitle={"Add Recipe Menu"}
          description={
            "Here you can enter and add recipes to your recipe book. To edit, click the card element you wish to change. Once added, these recipes will appear in your Recipe Book."
          }
          subdescription={"Once you've added a recipe or two, let's check out your Recipe Book!"}
          link={"/recipes"}
          
        />
      )}
    </>
  );
}

export default AddRecipe;
