import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faBook, faBox, faPen, faUser } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="header">
        <Link to={'/'}>
            <h1>
                Dylan's <span className="recipe">Recipe</span> App
            </h1>
        </Link>
        <ul>
          <li>
            <Link to={'/'}><FontAwesomeIcon icon={faBook}/> Recipe Book</Link>
          </li>
          <li>
            <Link to={'/'}><FontAwesomeIcon icon={faBox}/> My Fridge</Link>
          </li>
          <li>
            <Link to={'/'}><FontAwesomeIcon icon={faPen}/> Add Recipes</Link>
          </li>
          <li>
            <Link to={'/login'}><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
          </li>
          <li>
            <Link to={'/register'}><FontAwesomeIcon icon={faUser}/> Register</Link>
          </li>
        </ul>
      </header>
  )
}

export default Header