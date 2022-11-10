import classes from "./SearchContentContainer.module.css"
import Card from "../UI/Card";
import placeholderImg from "../../images/placeholder.jpg"
import SearchContent from "./SearchContent";


const SearchContentContainer = ({ searchResults }) => {

    // DUMMY DATA
    const ingredientList = [
        { title: "Chicken", available: true },
        { title: "Paprika", available: true },
        { title: "Parmesian Cheese", available: true },
        { title: "Butter", available: false },
        { title: "Milk", available: true },
        { title: "Eggs", available: false },
        { title: "Panko Bread", available: true },
    ];

    const recipeList = [
        { text: "Cut chicken", order: 1 },
        { text: "Coat chicken in eggs/milk", order: 2 },
        { text: "Parmesian Cheese", order: 3 },
        { text: "Dust chicken in paprika/parmesian/panko bread mixture", order: 4 },
        { text: "Cook on 425 degrees for 1 hour.", order: 5 }
    ]

    const searchContent = searchResults.map(result => {
        return (
            <SearchContent recipeTitle={result.name} ingredientList={result.recipe} recipeList={result.steps} image={""} description={""}/>
        )
    })

    return (
        <div className={classes["search_container"]}>
            {searchContent}
        </div>
    )

}

export default SearchContentContainer;