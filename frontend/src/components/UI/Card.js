import classes from "./Card.module.css"

const Card = (props) => {
    return (
        <div className={`${classes.card} ${props.class ? props.class : ''}`}>
            <div className={classes["search_container"]}>
                {props.children} 
            </div>
        </div>
    )
}

export default Card;