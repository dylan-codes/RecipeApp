import classes from './AddRecipeUI.module.css'

const DescriptionInterface = ({ onDescriptionChange, description }) => {
  console.log(description)
  return (
    <>
      <h1>Enter a description:</h1>
      <form>
        <textarea className={classes['addRecipe_textarea']} placeholder="Description" onChange={onDescriptionChange} value={description}/>
      </form>
    </>
  )
}

export default DescriptionInterface