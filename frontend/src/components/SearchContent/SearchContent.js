import Card from "../UI/Card";
import classes from "./SearchContent.module.css";
import placeholderImg from "../../images/placeholder.jpg";

const SearchContent = ({ recipeTitle, ingredientList, recipeList, image, description }) => {

  const ingredients = ingredientList.map((ingredient) => {
    return (
      <li>
        <p
          className={
            /* ingredient.available */ true ? classes["text_has"] : classes["text_hasNot"]
          }
        >
          {Object.keys(ingredient)}
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
      <h3 className={classes["search_header"]}>{recipeTitle}</h3>
      <div className={classes["search_info"]}>
        <div className={classes.column1}>
            <div className={classes.imageContent}>
            <img className={classes.imageContent} src={placeholderImg}></img>
            </div>
            <div className={classes.description}>
                <h4>Description:</h4>
                <p>
                    classic flavor for a classic person. Serves 2 or more.. possible to serve over 1,000 depending on how much of the ingredients you hbave..
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

export default SearchContent;
