const TitleInterface = (onTitleChange) => {
  return (
    <>
      <form>
        <h1>Enter a recipe title:</h1>
        <input placeholder="Recipe Title" onChange={onTitleChange.onTitleChange}/>
      </form>
    </>
  )
}

export default TitleInterface