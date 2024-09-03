// view.js
import { cardTemplate } from "./function/cardTemplate.js"
import { createDropDown } from "./filters/createDropDown.js"
import { recipes } from "./data/recipes.js"

export class View {
    constructor() {
        this.displayRecipes(recipes)
        this.getDropDowns()
    }

    // afficher toutes les recettes
    displayRecipes(recipes) {
        const recipesContainer = document.getElementById("recipe-container")

        // vider l'HTML
        recipesContainer.innerHTML = ""

        // boucle recettes
        recipes.forEach(recipe => {
            const recipeElement = this.createCardRecipe(recipe)
            recipesContainer.appendChild(recipeElement)
        })
    }

    // créer carte de recette
    createCardRecipe(recipe) {
        return cardTemplate(recipe)
    }

    // créer les dropdowns
    getDropDowns() {
        createDropDown(this, "Ingredients")
        createDropDown(this, "Appliance")
        createDropDown(this, "Ustensils")
    }
}
