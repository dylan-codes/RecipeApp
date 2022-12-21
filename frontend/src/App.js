import "./App.css";
import { useEffect, useState } from "react";
import UserInputForm from "./components/UserInput/UserInputForm";
import RecipeCardContainer from "./components/RecipeCard/RecipeCardContainer";
import InventoryProvider from "./context/InventoryProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import RecipeBook from "./pages/RecipeBook";
import AddRecipe from "./pages/AddRecipe";
import LandingPage from "./pages/LandingPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";


function App() {
  return (
    <div className="App">
      <Router>
        <InventoryProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route element={<ProtectedRoutes/>}>
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/recipes' element={<RecipeBook/>} />
              <Route path='/add' element={<AddRecipe key={"AddRecipe"}/>} />
            </Route>
            

          </Routes>
        </InventoryProvider>
      </Router>
    </div>
  );
}


export default App;
