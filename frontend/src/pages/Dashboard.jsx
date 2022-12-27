import { useEffect, useState, useContext } from "react";
import UserInputForm from "../components/UserInput/UserInputForm";
import RecipeCardContainer from "../components/RecipeCard/RecipeCardContainer";
import AuthContext from "../context/auth-context";
import TutorialCard from "../components/TutorialCard/TutorialCard";

function Dashboard() {
  const [searchData, setSearchData] = useState(null);
  const [tutorialState, setTutorialState] = useState(null);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    setTutorialState(localStorage.getItem("siteTutorial"));
  }, []);

  /*     useEffect(() => {
        const getRecipes = async () => {
        try {
            const response = await fetch("/api/recipes", {
            method: "GET",
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${AuthCtx.user.token}` },
            });
            const data = await response.json();

            setSearchData(data.results);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
        };

        getRecipes();
    }, []); */
  /*   console.log(searchData); */

  const onSubmit = (searchResults) => {
    setSearchData(searchResults);
  };

  const closeTutorial = () => {
    console.log("clicked");
    setTutorialState(null);
  };

  return (
    <>
      <div className="container">
        <div className="form-content">
          <h3 className="form-header">Whatcha working with today?</h3>
          <p>Search for recipes you can make from your own recipe book</p>
          <UserInputForm onSubmit={onSubmit} />
        </div>
      </div>

      <div className="searchContent">
        {searchData && searchData.length === 0 && (
          <h3 className="search-error">No recipes found.</h3>
        )}
        {searchData && (
          <RecipeCardContainer
            key={"RecipeContainer"}
            searchResults={searchData}
          />
        )}
      </div>

      {tutorialState === "true" && (
        <TutorialCard
          title={"Welcome!"}
          subtitle={"Search Dashboard"}
          description={
            "Here, you can enter ingredients you have in the kitchen and search for recipes from your Recipe Book. Right now your Recipe Book is empty!"
          }
          subdescription={
            "Let's continue to the Add Recipes page and create our first recipe!"
          }
          link={"/add"}
        />
      )}
      {tutorialState === "false" && (
        <TutorialCard
          title={"Sayōnara!"}
          subtitle={"Search Dashboard"}
          description={
            "Now that we've created a recipe let's give the search a go. Search for the recipe(s) you have created. Note: you must search by the ingredients you used in them so remember them!"
          }
          subdescription={
            "You have reached the end of the tips. Welcome to the app, recipe sensei."
          }
          link={"/dashboard"}
          finale={true}
          closeTutorial={closeTutorial}
        />
      )}
    </>
  );
}

export default Dashboard;
