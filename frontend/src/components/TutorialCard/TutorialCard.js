import Card from "../UI/Card";
import classes from "./TutorialCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TutorialCard = (props) => {

  const endTutorial = () => {
    localStorage.removeItem("siteTutorial")
    props.closeTutorial()
  }
  
  return (
    <div className={classes["tutorialCard-container"]}>
      <Card class={classes["tutorialCard"]}>
        <h1>{props.title}</h1>
        <h4>{props.subtitle}</h4>
        <div className={classes["descriptionBox"]}>
          <p>{props.description}</p>
          <h4 className={classes["subdescription"]}>{props.subdescription}</h4>

          {props.listItem && (
            <ul>
              {props.listItems.map((listItem) => {
                return <li>{listItem}</li>;
              })}
            </ul>
          )}
        </div>
        {props.link && (
          <Link to={props.link}>
            <button
              className={classes["recipeInterface_addStep"]}
              type="submit"
              onClick={() => props.finale === true ? endTutorial() : ''}
            >
              {props.finale === true ? <FontAwesomeIcon icon={faFlagCheckered} size="xl" /> : <FontAwesomeIcon icon={faArrowRight} size="xl" />}
            </button>
          </Link>
        )}
      </Card>
    </div>
  );
};

export default TutorialCard;
