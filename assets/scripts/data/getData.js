import { recipes } from "./recipes.js"

/**
 * récupérer les ingrédients
 * @returns {any[]}
 */
export function getIngredients() {
    const ingredientsSet = new Set()

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient)
        })
    })

    return Array.from(ingredientsSet)
}

/**
 * récupérer les appareils
 * @returns {any[]}
 */
export function getAppliances() {
    const appliancesSet = new Set()

    recipes.forEach(recipe => {
        appliancesSet.add(recipe.appliance)
    })

    return Array.from(appliancesSet)
}

/**
 * récupérer les ustensiles
 * @returns {any[]}
 */
export function getUstensils() {
    const ustensilsSet = new Set()

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil)
        })
    })

    return Array.from(ustensilsSet)  // Convertit l'ensemble en tableau
}

/**
 * récupérer la liste selon le type
 * @param type
 * @returns {*[]}
 */
export function getItemsList(type) {
    let itemsList = []
    if (type === "Ingredients") {
        itemsList = getIngredients()
    } else if (type === "Appliances") {
        itemsList = getAppliances()
    } else if (type === "Ustensils") {
        itemsList = getUstensils()
    }
    return itemsList
}
