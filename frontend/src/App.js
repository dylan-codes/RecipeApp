import "./App.css";
import { useEffect, useState } from "react";
import UserInputForm from "./components/UserInput/UserInputForm";
import SearchContentContainer from "./components/SearchContent/SearchContentContainer";

function App() {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch("/api/recipe", {
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
  }, []);
  /*   console.log(searchData); */

  return (
    <div className="App">
      <header className="header">
        <h1>
          Dylan's <span className="recipe">Recipe</span> App
        </h1>
      </header>
      <div className="container">
        <div className="form-content">
          <h3>Whatcha working with today?</h3>
          <UserInputForm />
        </div>
      </div>

      <div>
        <SearchContentContainer searchResults={searchData} />
      </div>
    </div>
  );
}

export default App;
