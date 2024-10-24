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

        /**
         * barre de recherche
         */
        this.searchInputIndex()
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
        let dropdownIngredient = new Dropdown("Ingredients",(type, selectedText, isRemoving) => {this.updateSelectedItems(type, selectedText, isRemoving)})
        dropdownIngredient.createDropDown(this)
        let dropdownAppliance = new Dropdown("Appliances",(type, selectedText, isRemoving) => {this.updateSelectedItems(type, selectedText, isRemoving)})
        dropdownAppliance.createDropDown(this)
        let dropdownUstensils = new Dropdown("Ustensils",(type, selectedText, isRemoving) => {this.updateSelectedItems(type, selectedText, isRemoving)})
        dropdownUstensils.createDropDown(this)
    }

    /**
     * fonctionne pour mettre a jour les item sélectionner
     * @param type
     * @param selectedText
     * @param isRemoving
     */
    updateSelectedItems(type, selectedText, isRemoving = false) {
        if (!isRemoving) {
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
        } else {
            switch (type) {
                case "Ingredients":
                    this.selectedIngredientsList = this.selectedIngredientsList.filter((text) => text !== selectedText)
                    break
                case "Appliances":
                    this.selectedApplianceList = this.selectedApplianceList.filter((text) => text !== selectedText)
                    break
                case "Ustensils":
                    this.selectedUstensilsList = this.selectedUstensilsList.filter((text) => text !== selectedText)
                    break
            }
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

        // afficher un message si y a 0 recettes
        if (recipes.length === 0) {
            recipesContainer.innerHTML =
                `
                    <p class="no-recipe-message">Aucune recette ne correspond à votre recherche.</p>
                `
        } else {
            // vider l'HTML
            recipesContainer.innerHTML = ""

            // boucle recettes
            recipes.forEach(recipe => {
                const recipeElement = createCardRecipe(recipe)
                recipesContainer.appendChild(recipeElement)
            })
        }

        this.showNumberRecipes(recipes)
    }

    filterRecipes() {
        let filteredRecipes = recipes

        filteredRecipes = this.filteredByIngredients(filteredRecipes)
        filteredRecipes = this.filteredByAppliance(filteredRecipes)
        filteredRecipes = this.filteredByUstensils(filteredRecipes)
        filteredRecipes = this.filteredBySearchInput(filteredRecipes)

        // afficher les recettes filtrées
        this.displayRecipes(filteredRecipes, this.createCardRecipe)
    }

    filteredByIngredients(filteredRecipes) {
        if (this.selectedIngredientsList.length > 0) {
            return filteredRecipes.filter(recipe =>
                this.selectedIngredientsList.every(ingredient =>
                    recipe.ingredients.some(recIng => recIng.ingredient.includes(ingredient))
                )
            )
        }
        return filteredRecipes
    }

    filteredByAppliance(filteredRecipes) {
        // je filtre par appareil
        if (this.selectedApplianceList.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.selectedApplianceList.includes(recipe.appliance)
            )
        }

        return filteredRecipes
    }

    filteredByUstensils(filteredRecipes) {
        // je filtre par ustensiles
        if (this.selectedUstensilsList.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.selectedUstensilsList.every(ustensil =>
                    recipe.ustensils.includes(ustensil)
                )
            )
        }

        return filteredRecipes
    }

    filteredBySearchInput(filteredRecipes) {
        // je filtre dans l'input apres 3 caractères
        const searchQuery = this.searchQuery?.toLowerCase() || ""
        if (searchQuery.length >= 3) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchQuery) ||
                recipe.description.toLowerCase().includes(searchQuery) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchQuery)) ||
                recipe.appliance.toLowerCase().includes(searchQuery) ||
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchQuery))
            )
        }

        return filteredRecipes
    }

    /**
     * afficher le nombre de recettes
     * @param recipes
     */
    showNumberRecipes(recipes) {
        const numberDiv = document.querySelector('.numberFound')

        if (numberDiv) {
            numberDiv.textContent = `${recipes.length} Recettes`
        }
    }

    searchInputIndex() {
        const searchInputIndex = document.querySelector('.searchBar__input')

        searchInputIndex.addEventListener('input', (event) => {
            const inputValue = event.target.value

            if (inputValue.length >= 3) {
                this.searchQuery = inputValue
            } else {
                this.searchQuery = ""
            }

            this.filterRecipes()
        })
    }

    // créer des function a part pour les filtres ex: filteredByIngredients //////
    // TODO: tester la recherche avec "filter" et "for" sur JSBench.ch
    // TODO: documentation
}
