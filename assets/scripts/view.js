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
        let dropdownIngredient = new Dropdown("Ingredients",(type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownIngredient.createDropDown(this)
        let dropdownAppliance = new Dropdown("Appliances",(type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownAppliance.createDropDown(this)
        let dropdownUstensils = new Dropdown("Ustensils",(type, selectedText) => {this.updateSelectedItems(type, selectedText)})
        dropdownUstensils.createDropDown(this)
    }

    /**
     * fonctionne pour mettre a jour les item sélectionner
     * @param type
     * @param selectedText
     */
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

        console.log('Ingredients List:', this.selectedIngredientsList)
        console.log('Appliances List:', this.selectedApplianceList)
        console.log('Ustensils List:', this.selectedUstensilsList)

        // lancer vers la fonction qui s'occupe des filtres
        this.filterRecipes()
    }

    /**
     * Afficher les recettes
     * @param recipes
     * @param createCardRecipe
     */
    displayRecipes(recipes, createCardRecipe) {
        const recipesContainer = document.getElementById("recipe-container")

        // vider l'HTML
        recipesContainer.innerHTML = ""

        // boucle recettes
        recipes.forEach(recipe => {
            const recipeElement = createCardRecipe(recipe)
            recipesContainer.appendChild(recipeElement)
        })

        this.showNumberRecipes(recipes)
    }

    filterRecipes() {
        let filteredRecipes = recipes

        // je filtre par ingredients
        if (this.selectedIngredientsList.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.selectedIngredientsList.every(ingredient =>
                    recipe.ingredients.some(recIng => recIng.ingredient.includes(ingredient))
                )
            )
        }

        // je filtre par appareil
        if (this.selectedApplianceList.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.selectedApplianceList.includes(recipe.appliance)
            )
        }

        // je filtre par ustensiles
        if (this.selectedUstensilsList.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.selectedUstensilsList.every(ustensil =>
                    recipe.ustensils.includes(ustensil)
                )
            )
        }

        console.log(filteredRecipes, 'Filtered Recipes')
        console.log(recipes, 'Recipes')

        // afficher les recettes filtrées
        this.displayRecipes(filteredRecipes, this.createCardRecipe)
    }

    showNumberRecipes(recipes) {
        const numberDiv = document.querySelector('.numberFound')

        if (numberDiv) {
            numberDiv.textContent = `${recipes.length} Recettes`
        }
    }
}
