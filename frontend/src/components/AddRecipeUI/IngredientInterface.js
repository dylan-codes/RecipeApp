
import IngredientSearch from '../IngredientSearch/IngredientSearch'

const IngredientInterface = ({ addIngredientHandler, removeIngredientHandler }) => {
  return (
    <>
      <h1>Enter an ingredient:</h1>
      <IngredientSearch addIngredient={addIngredientHandler} removeIngredient={removeIngredientHandler}/>
    </>
  )
}

export default IngredientInterface