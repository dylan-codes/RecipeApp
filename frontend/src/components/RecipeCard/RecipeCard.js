import { useContext } from "react";
import Card from "../UI/Card";
import classes from "./RecipeCard.module.css";
import placeholderImg from "../../images/icons/SVG/placeholder.jpg";
import InventoryContext from "../../context/inventory-context";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import burgerImg from "../../images/icons/SVG/burger.svg";
import hotdogImg from "../../images/icons/SVG/hotdog.svg";
import missingImg from "../../images/icons/SVG/Missing.svg";
import pizzaImg from "../../images/icons/SVG/pizza.svg";
import chickenImg from "../../images/icons/SVG/chicken.svg";

const RecipeCard = ({ recipeTitle, ingredientList, recipeList, image, description, availableIngredients }) => {
  const inventoryCtx = useContext(InventoryContext);

  const ingredients = ingredientList.map((ingredient) => {

    const userHasIngredient = inventoryCtx.items.some(item => {
      return item.toLowerCase() === ingredient.name.toLowerCase();
    });

    let ingredientDisplayText = (ingredient.name + ' (' + ingredient.amount + ') ')
    return (
      <li>
        <p
          className={ // availableIngredients should look something like ["chicken", "bread", etc.]
            userHasIngredient === true ? classes["text_has"] : classes["text_hasNot"]
          }
        >
          {ingredientDisplayText}
        </p>
      </li>
    );
  });

  const recipe = recipeList.map((step) => {
    return (
      <li>
          {step}
      </li>
    );
  });

  return (
    <Card>
      <div className={classes["search_header"]}>
        <h3>{recipeTitle}</h3>
        <a className={classes["favorite_star"]}><FontAwesomeIcon icon={faStar} /></a>
      </div>
      <div className={classes["search_info"]}>
        <div className={classes.column1}>
            <div className={classes.imageContent}>
            <img className={classes.imageContent} src={image} alt={"Food"}></img>
            </div>
            <div className={classes.description}>
                <h4>Description:</h4>
                <p className="dont-break-out-of-div">
                    {description}
                </p>
            </div>
        </div>
        <div className={classes.column2}>
          <div className={classes["ingredients_container"]}>
            <h4>Ingredients:</h4>
            <ul className={classes["ingredient_list"]}>
              {ingredients}
            </ul>
          </div>
          <div className={classes.recipe}>
            <h4>Recipe:</h4>
            <ol>
              {recipe}
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;
