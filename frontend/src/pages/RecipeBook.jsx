import { useEffect, useState, useContext } from "react";
import UserInputForm from "../components/UserInput/UserInputForm";
import RecipeCardContainer from "../components/RecipeCard/RecipeCardContainer";
import AuthContext from "../context/auth-context";
import TutorialCard from "../components/TutorialCard/TutorialCard";

function RecipeBook() {
  const [searchData, setSearchData] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([""]);
  const AuthCtx = useContext(AuthContext);
  const email = JSON.parse(localStorage.getItem("user")).email;
  const token = JSON.parse(localStorage.getItem("user")).token;
  const userName = email.substring(0, email.lastIndexOf("@"));

  if (localStorage.getItem("siteTutorial")){
    localStorage.setItem("siteTutorial", "false")
  }

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch("/api/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setSearchData(data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
      }
    };

    getRecipes();
  }, []);

  return (
    <>
      <div className="recipebook">
        <div className="recipebook-cover">
          <h1 className="recipebook-title">
            {userName}'s Recipe Book
          </h1>
          <div className="recipebook-title-img" />
        </div>
        <div className="recipebook-page" />
        <div className="recipebook-spine" />
        <div className="recipebook-content">
          <div className="form-content">
            <h3 className="form-header">Your Personally Curated Recipe Book</h3>
            <div className="recipebook-cards">
              {searchData.length === 0 ? (
                <h4>No recipes found</h4>
              ) : (
                <RecipeCardContainer
                  key={"RecipeBookContainer"}
                  availableIngredients={availableIngredients}
                  searchResults={searchData} // If the user manually refreshes, use the locStorage, otherwise the useEffect ran and returned searchData
                  cardType="book"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div />
      {localStorage.getItem("siteTutorial") && (
        <TutorialCard
          title={"Hola!"}
          subtitle={"Recipe Book"}
          description={
            "Here you can view recipes you've collected over time. Ingredients in the Search Dashboard will show up here as green. This is a good way to get an overview of what all you can possibly make."
          }
          subdescription={"Now that you've seen it all, let's go search for some recipes!"}
          link={"/dashboard"}
        />
      )}
    </>
  );
}

export default RecipeBook;
