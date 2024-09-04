import { getIngredients, getAppliances, getUstensils } from "../data/getData.js"

export function createDropDown(viewInstance, type) {
    // récup la div
    const filtersContainer = document.querySelector(".filters")

    // créer un early return
    if (!filtersContainer) return

    // créer un bouton select
    const select = document.createElement("select")
    select.className = "dropdown"

    // créer le dropdown avec une option
    select.innerHTML = `<option value="">${type}</option>`

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
        select.innerHTML += `<option value="${item}">${item}</option>`

        // const option = document.createElement("option")
        // option.value = item
        // option.textContent = item
        // select.appendChild(option)
    })

    // append le dropdown à la div
    filtersContainer.appendChild(select)
}
