export function recipeTemplate(recipe) {
    const maxLength = 135

    // col div
    const div = document.createElement("div")
    div.className = "col-4"

    // card
    const recipeCard = document.createElement("div")
    recipeCard.className = "recipe-card h-100"

    // div infos
    const infoDiv = document.createElement("div")
    infoDiv.className = "infos"

    // img
    const img = document.createElement("img")
    img.src = `assets/img/${recipe.image}`
    img.alt = recipe.name

    // title
    const title = document.createElement("h2")
    title.textContent = recipe.name

    // description
    const recette = document.createElement("span")
    recette.textContent = "recette"
    recette.className = "titreContenu"
    const description = document.createElement("p")
    description.className = "description"
    let truncatedDescription = recipe.description

    if (truncatedDescription.length > maxLength) {
        truncatedDescription = truncatedDescription.substring(0, maxLength) + "..."
    }
    description.textContent = truncatedDescription

    // ingredients loop
    const ingredientsList = document.createElement("div")
    ingredientsList.className = "row"
    recipe.ingredients.forEach(ingredient => {
        const ingredientCol = document.createElement("div")
        ingredientCol.className = "col-6 ingredientsCol"
        const ingredientTitle = document.createElement("h3")
        const ingredientItem = document.createElement("p")

        ingredientTitle.textContent = `${ingredient.ingredient}`
        ingredientItem.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`
        ingredientsList.appendChild(ingredientCol).appendChild(ingredientTitle)
        ingredientsList.appendChild(ingredientCol).appendChild(ingredientItem)
    })

    // Append all elements to the card
    recipeCard.appendChild(img)
    recipeCard.appendChild(infoDiv).appendChild(title)
    recipeCard.appendChild(infoDiv).appendChild(recette)
    recipeCard.appendChild(infoDiv).appendChild(description)
    recipeCard.appendChild(infoDiv).appendChild(ingredientsList)

    // Append card to the column div
    div.appendChild(recipeCard)

    return div
}