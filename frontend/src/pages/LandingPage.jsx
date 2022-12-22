import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faBook,
  faBox,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import guyEating from '../images/landing/guyEating.jpg'
import classes from "./LandingPage.module.css";



const LandingPage = () => {
  return (
    <>
      <div className="container">
        <div className={classes["landing-container"]}>
          <div className={classes["landing-header"]}>
            <h3 className="form-header">Ready to chef it up?</h3>
            <span>
              Join tens of twenties of users that are keeping track of their recipes (and what recipes they can make 😉)
            </span>
            <img className={classes["landing-img"]} src={guyEating}/>
          </div>

          <div className={classes["landing-nav"]}>
            
              <Link to={"/login"} className={classes["fa-white"]}>
                <button className="btn">
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Login
                </button>
              </Link>
            
              <Link to={"/register"} className={classes["fa-white"]}>
                <button className="btn">
                  <FontAwesomeIcon icon={faUser} /> 
                  Register
                </button>
              </Link>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
