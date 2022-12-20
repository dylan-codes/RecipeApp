import { useContext } from "react";
import classes from "./RecipeCardContainer.module.css"
import RecipeCard from "./RecipeCard";
import InventoryContext from "../../context/inventory-context";

const RecipeCardContainer = ({ searchResults, cardType }) => {
    const inventoryCtx = useContext(InventoryContext)

    let sortSearchResults = searchResults.sort((a, b) => {
        let aCount = 0;
        let bCount = 0;
        inventoryCtx.items.forEach((item) =>{
            for(let i = 0; i < a.ingredients.length; i++) {
                if (a.ingredients[i].name.includes(item)){
                    aCount++
                }
            }
            for(let i = 0; i < b.ingredients.length; i++) {
                if (b.ingredients[i].name.includes(item)){
                    bCount++
                }
            }
        })

        if (aCount > bCount) {
            return -1
        } else {
            return 1
        }
    })

    const recipeCard = searchResults.map(result => {
        return (
            <div className={cardType === "book" ? classes["book_container"] : classes["search_container"]}>
                <RecipeCard key={result.name} recipeTitle={result.name} ingredientList={result.ingredients} recipeList={result.steps} image={""} description={""}/>
            </div>
        )
    })

    return (
        <div>
            {recipeCard}
        </div>
    )

}

export default RecipeCardContainer;