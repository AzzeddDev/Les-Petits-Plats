import { recipes } from "./data/recipes.js"
import { cardTemplate } from "./function/cardTemplate.js"
import Dropdown from "./filters/Dropdown.js"

export class View {
    constructor() {
        this.selectedIngredientsList = []
        this.selectedApplianceList = []
        this.selectedUstensilsList = []

        /**
         * afficher les recettes
         */
        this.displayRecipes(recipes, this.createCardRecipe)

        /**
         * afficher les filtres
         */
        this.getDropDowns()
    }

    /**
     * créer carte de recette
     * @param recipe
     * @returns {*}
     */
    createCardRecipe(recipe) {
        return cardTemplate(recipe)
    }

    /**
     * créer les dropdowns
     */
    getDropDowns() {
        let dropdownIngredient = new Dropdown((type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownIngredient.createDropDown(this, "Ingredients")
        let dropdownAppliance = new Dropdown((type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownAppliance.createDropDown(this, "Appliances")
        let dropdownUstensils = new Dropdown((type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownUstensils.createDropDown(this, "Ustensils")
    }

    updateSelectedItems(type, selectedText) {
        switch (type) {
            case "Ingredients":
                this.selectedIngredientsList.push(selectedText)
                break
            case "Appliances":
                this.selectedApplianceList.push(selectedText)
                break
            case "Ustensils":
                this.selectedUstensilsList.push(selectedText)
                break
        }
        console.log(this.selectedUstensilsList, this.selectedIngredientsList, this.selectedApplianceList)
    }

    // TODO: update l'affichage des lists dans l HTML
    // TODO: éviter les doublon
    // TODO: commencer la recherche dans la liste

    displayRecipes(recipes, createCardRecipe) {
        const recipesContainer = document.getElementById("recipe-container")

        // vider l'HTML
        recipesContainer.innerHTML = ""

        // boucle recettes
        recipes.forEach(recipe => {
            const recipeElement = createCardRecipe(recipe)
            recipesContainer.appendChild(recipeElement)
        })
    }
}
