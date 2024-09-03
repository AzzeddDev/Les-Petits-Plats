import { recipes } from "./recipes.js"

// récupérer les ingrédients uniques
export function getIngredients() {
    const ingredientsSet = new Set()

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(ingredient.ingredient)
        })
    })

    return Array.from(ingredientsSet)
}

// récupérer les appareils uniques
export function getAppliances() {
    const appliancesSet = new Set()

    recipes.forEach(recipe => {
        appliancesSet.add(recipe.appliance)
    })

    return Array.from(appliancesSet)
}

// récupérer les ustensiles uniques
export function getUstensils() {
    const ustensilsSet = new Set()

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil)
        })
    })

    return Array.from(ustensilsSet)  // Convertit l'ensemble en tableau
}
