import classes from './AddRecipeUI.module.css'

const DescriptionInterface = ({ onDescriptionChange }) => {
  return (
    <>
      <h1>Enter a description:</h1>
      <form>
        <textarea className={classes['addRecipe_textarea']} placeholder="Description" onChange={onDescriptionChange}/>
      </form>
    </>
  )
}

export default DescriptionInterface