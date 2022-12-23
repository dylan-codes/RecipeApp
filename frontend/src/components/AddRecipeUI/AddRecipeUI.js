import DescriptionInterface from "./DescriptionInterface";
import ImageInterface from "./ImageInterface";
import IngredientInterface from "./IngredientInterface";
import RecipeInterface from "./RecipeInterface";
import TitleInterface from "./TitleInterface";

const AddRecipeUI = ({ inputInterface, onImageChange, onTitleChange, onDescriptionChange, addIngredientHandler, removeIngredientHandler, recipeSteps, addRecipeStepHandler, description }) => {
    const interfaceSwitch = () => {
        switch (inputInterface) {
            case 'description':
                return <DescriptionInterface onDescriptionChange={onDescriptionChange} description={description}/>
            case 'image':
                return <ImageInterface onImageChange={onImageChange}/>
            case 'ingredients':
                return <IngredientInterface addIngredientHandler={addIngredientHandler} removeIngredientHandler={removeIngredientHandler}/>
            case 'recipe':
                return <RecipeInterface recipeSteps={recipeSteps} addRecipeStepHandler={addRecipeStepHandler}/>
            case 'title':
                return <TitleInterface onTitleChange={onTitleChange}/>
            case 'editIngredient':
                return 
            default:
                return <h2>Click on the element you wish to edit!</h2>
        }
    }

    let activeInterface = interfaceSwitch();

    return (
    <div>
        {activeInterface}
    </div>
  )
}

export default AddRecipeUI