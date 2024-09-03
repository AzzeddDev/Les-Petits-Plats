/**
 * function pour l'affichage des recettes
 * @param recipes
 * @param createCardRecipe
 */
export function displayRecipes(recipes, createCardRecipe) {
    const recipesContainer = document.getElementById("recipe-container")

    // vider l'HTML
    recipesContainer.innerHTML = ""

    // boucle recettes
    recipes.forEach(recipe => {
        const recipeElement = createCardRecipe(recipe)
        recipesContainer.appendChild(recipeElement)
    })
}