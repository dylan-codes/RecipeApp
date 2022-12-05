import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faBook, faBox, faPen, faUser } from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '../../hooks/use-logout'
import AuthContext from '../../context/auth-context'
import { useNavigate } from 'react-router-dom'


function Header() {
  const {user} = useContext(AuthContext);
  const navigator = useNavigate()
  
  const { logout } =  useLogout();

  const handleClick = () => {
    logout()
    navigator('')
  }

  return (
    <header className="header">
        <Link to={'/dashboard'}>
            <h1>
                Dylan's <span className="recipe">Recipe</span> App
            </h1>
        </Link>
        
        <ul>
          {user && <li>
            <Link to={'/recipes'}><FontAwesomeIcon icon={faBook}/> Recipe Book</Link>
          </li>}
          {user && <li>
            <Link to={'/add'}><FontAwesomeIcon icon={faPen}/> Add Recipes</Link>
          </li>}
          {!user && <li>
            <Link to={'/login'}><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
          </li>}
          {!user && <li>
            <Link to={'/register'}><FontAwesomeIcon icon={faUser}/> Register</Link>
          </li>}
          {user && <li>
            <button className='btn' onClick={handleClick}>Logout</button>
          </li>}
        </ul>
      </header>
  )
}

export default Header