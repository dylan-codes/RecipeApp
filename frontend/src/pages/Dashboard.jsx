import { useEffect, useState } from "react";
import UserInputForm from "../components/UserInput/UserInputForm";
import SearchContentContainer from "../components/SearchContent/SearchContentContainer";

function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([""]);

  /*   useEffect(() => {
        const getRecipes = async () => {
        try {
            const response = await fetch("/api/recipes", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();

            setSearchData(data.results);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
        }
        };

        getRecipes();
    }, []); */
  /*   console.log(searchData); */

  const onSubmit = (searchResults) => {
    setSearchData(searchResults);
  };

  const onAddIngredient = (ingredient) => {
    setAvailableIngredients(ingredient);
  };

  return (
    <>
      <div className="container">
        <div className="form-content">
          <h3 className="form-header">Whatcha working with today?</h3>
          <UserInputForm
            onSubmit={onSubmit}
            onAddIngredient={onAddIngredient}
          />
        </div>
      </div>

      <div className="searchContent">
        <SearchContentContainer
          availableIngredients={availableIngredients}
          searchResults={searchData}
        />
      </div>
    </>
  );
}

export default Dashboard;
