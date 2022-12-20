import burgerImg from "../../images/icons/SVG/burger.svg";
import hotdogImg from "../../images/icons/SVG/hotdog.svg";
import missingImg from "../../images/icons/SVG/Missing.svg";
import pizza from "../../images/icons/SVG/pizza.svg";
import chicken from "../../images/icons/SVG/chicken.svg"
import classes from "./ImageInterface.module.css"

const ImageInterface = ({onImageChange}) => {

  return (
    <>
        <div>
            <h1>Available Icons:</h1>
            <div>
                <ul className={classes['image-container']}>
                    <img className={classes['imageContent']} src={burgerImg} onClick={() => onImageChange('burger')} alt="Hamburger Icon"/>
                    <img className={classes['imageContent']} src={hotdogImg} onClick={() => onImageChange('hotdog')} alt="Hotdog Icon"/>
                    <img className={classes['imageContent']} src={pizza} onClick={() => onImageChange('pizza')} alt="Pizza Icon"/>
                    <img className={classes['imageContent']} src={chicken} onClick={() => onImageChange('chicken')} alt="Chicken Icon"/>
                    <img className={classes['imageContent']} src={missingImg} onClick={() => onImageChange('missing')} alt="Unknown Icon"/>
                </ul>
            </div>
        </div>
    </>
  )
}

export default ImageInterface