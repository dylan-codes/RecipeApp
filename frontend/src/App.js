import logo from './logo.svg';
import './App.css';
import UserInputForm from './components/UserInput/UserInputForm';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Dylan's <span className="recipe">Recipe</span> App</h1>
      </header>
      <div className="container">
        <h3>Whatcha working with today?</h3>
        <UserInputForm/>
      </div>

    </div>
  );
}

export default App;
