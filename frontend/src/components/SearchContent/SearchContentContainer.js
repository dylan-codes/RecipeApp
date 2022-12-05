import { useContext } from "react";
import classes from "./SearchContentContainer.module.css"
import SearchContent from "./SearchContent";
import InventoryContext from "../../context/inventory-context";

const SearchContentContainer = ({ searchResults, cardType }) => {
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

    const searchContent = searchResults.map(result => {
        return (
            <div className={cardType === "book" ? classes["book_container"] : classes["search_container"]}>
                <SearchContent key={result.name} recipeTitle={result.name} ingredientList={result.ingredients} recipeList={result.steps} image={""} description={""}/>
            </div>
        )
    })

    return (
        <div>
            {searchContent}
        </div>
    )

}

export default SearchContentContainer;