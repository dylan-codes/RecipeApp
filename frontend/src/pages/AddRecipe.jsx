import { useState } from "react";
import UserInputForm from "../components/UserInput/UserInputForm";
import SearchContentContainer from "../components/SearchContent/SearchContentContainer";
import Card from "../components/UI/Card";
import classes from '../components/SearchContent/SearchContent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import placeholderImg from "../images/icons/SVG/chicken.svg";

function AddRecipe() {
  const [searchData, setSearchData] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([""]);

  const onSubmit = (searchResults) => {
    setSearchData(searchResults);
  };

  const onAddIngredient = (ingredient) => {
    setAvailableIngredients(ingredient);
  };

  return (
    <>
    <div className="">
      <Card>
        <div className={classes["search_header"]}>
          <h3>Title</h3>
          <a className={classes["favorite_star"]}><FontAwesomeIcon icon={faStar} /></a>
        </div>
        <div className={classes["search_info"]}>
          <div className={classes.column1}>
              <div className={classes.imageContent}>
              <img className={classes.imageContent} src={placeholderImg} alt={"Food"}></img>
              </div>
              <div className={classes.description}>
                  <h4>Description:</h4>
                  <hr/>
                  <p>
                      classic flavor for a classic person. Serves 2 or more.. possible to serve over 1,000 depending on how much of the ingredients you hbave..
                  </p>
              </div>
          </div>
          <div className={classes.column2}>
            <div className={classes["ingredients_container"]}>
              <h4>Ingredients:</h4>
              <ul className={classes["ingredient_list"]}>
                
              </ul>
            </div>
            <div className={classes.recipe}>
              <h4>Recipe:</h4>
              <ol>

              </ol>
            </div>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
}

export default AddRecipe;
