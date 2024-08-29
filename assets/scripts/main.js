import { RecipeFactory } from './factory/recipeFactory.js'
import { recipes } from './data/recipes.js'

document.addEventListener("DOMContentLoaded", function() {
    const recipesContainer = document.getElementById("recipe-container")
    const recetteFactory = new RecipeFactory()

    recipes.forEach(recipe => {
        const recipeElement = recetteFactory.createRecipe(recipe)
        recipesContainer.appendChild(recipeElement)
    })
})
