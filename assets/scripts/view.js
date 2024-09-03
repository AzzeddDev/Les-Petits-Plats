import { recipes } from "./data/recipes.js"
import { cardTemplate } from "./function/cardTemplate.js"
import { createDropDown } from "./filters/createDropDown.js"
import { displayRecipes } from "./function/displayRecipes.js"

export class View {
    constructor() {
        // afficher les recettes
        displayRecipes(recipes, this.createCardRecipe.bind(this))

        // afficher les filtres
        this.getDropDowns()
    }

    // créer carte de recette
    createCardRecipe(recipe) {
        return cardTemplate(recipe)
    }

    // créer les dropdowns
    getDropDowns() {
        createDropDown(this, "Ingredients")
        createDropDown(this, "Appliances")
        createDropDown(this, "Ustensils")
    }
}
