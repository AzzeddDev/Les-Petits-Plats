import { recipeTemplate } from "../template/recipeTemplate.js"

export class RecipeFactory {
    constructor() {}

    createRecipe(recipe) {
        // Utilisation du template pour générer la recette
        return recipeTemplate(recipe)
    }
}