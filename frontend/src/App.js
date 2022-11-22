import "./App.css";
import { useEffect, useState } from "react";
import UserInputForm from "./components/UserInput/UserInputForm";
import SearchContentContainer from "./components/SearchContent/SearchContentContainer";
import InventoryProvider from "./context/InventoryProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";


function App() {
  return (
    <div className="App">
      <Router>
        <InventoryProvider>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </InventoryProvider>
      </Router>
    </div>
  );
}


export default App;
