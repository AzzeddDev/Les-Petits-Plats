import { getIngredients, getAppliances, getUstensils } from "../data/getData.js"

export function createDropDown(viewInstance, type) {
    // récup la div
    const filtersContainer = document.querySelector(".filters")

    // créer un early return
    if (!filtersContainer) return

    // créer un bouton select
    const select = document.createElement("select")
    select.className = "dropdown"

    // créer le dropdown avec une option par défaut
    const defaultOption = document.createElement("option")
    defaultOption.value = ""
    defaultOption.textContent = type
    select.appendChild(defaultOption)

    // récupérer la liste des éléments dans un tableau
    let itemsList = []
    if (type === "Ingredients") {
        itemsList = getIngredients()
    } else if (type === "Appliances") {
        itemsList = getAppliances()
    } else if (type === "Ustensils") {
        itemsList = getUstensils()
    }

    // boucle pour afficher en liste
    itemsList.forEach(item => {
        const option = document.createElement("option")
        option.value = item
        option.textContent = item
        select.appendChild(option)
    })

    // append le dropdown à la div
    filtersContainer.appendChild(select)
}
