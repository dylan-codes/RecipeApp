import { useEffect, useState, useContext } from "react";
import UserInputForm from "../components/UserInput/UserInputForm";
import RecipeCardContainer from "../components/RecipeCard/RecipeCardContainer";
import AuthContext from "../context/auth-context";

function Dashboard() {
  const [searchData, setSearchData] = useState([]);
  const AuthCtx = useContext(AuthContext)

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

  return (
    <>
      <div className="container">
        <div className="form-content">
          <h3 className="form-header">Whatcha working with today?</h3>
          <UserInputForm
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <div className="searchContent">
        <RecipeCardContainer
          key={"RecipeContainer"}
          searchResults={searchData}
        />
      </div>
    </>
  );
}

export default Dashboard;