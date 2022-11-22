const express = require('express')
const router = express.Router()
const { searchIngredients, setIngredients } = require('../controllers/ingredientController')

router.route("/").post(searchIngredients)/* .post(setIngredients) */

/* router.get('/', (req, res) => {
    res.status(200).json({message: "yo"})

        try {
        Ingredient.ingredients.insertMany( [
            {ingredient: "Chicken"}
        ])
    } catch(e) {
        print (e)
    }
}) */

module.exports = router