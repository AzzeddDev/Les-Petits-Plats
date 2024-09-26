import {getItemsList} from "../data/getData.js"

export default class Dropdown {
    constructor(callback) {
        this.callback = callback
        this.selectedItem = []
    }

    createDropDown(viewInstance, type) {
        // récup la div
        const filtersContainer = document.querySelector(".filters")

        // créer un early return
        if (!filtersContainer) return

        // créer un bouton select
        const select = document.createElement("div")
        select.className = "dropdown"

        // créer le dropdown avec une option
        select.innerHTML = `<div class="type">${type}</div>`

        // récupérer la liste des éléments dans un tableau
        const itemsList = getItemsList(type)

        // créer un ul
        const hiddenList = document.createElement("ul")
        hiddenList.className = "hiddenList"

        // boucle pour afficher en liste
        itemsList.forEach(item => {
            hiddenList.innerHTML += `<li>${item}</li>`
        })

        // append le dropdown à la div
        filtersContainer.appendChild(select).appendChild(hiddenList)

        // ajouter un addEventListener sur la select
        select.addEventListener("click", () => {
            hiddenList.classList.toggle('show')
        })

        // sélectionner la div pour afficher les LI sélectionner
        const selectionDisplay = document.querySelector('.selectionDisplay')

        // afficher le click du li dans la console
        hiddenList.addEventListener("click", (event) => {
            if (event.target.tagName === 'LI') {
                // récupérer le text event
                const selectedText = event.target.textContent

                // push l'historique
                this.selectedItem.push(selectedText)

                // console.log(selectedText)

                this.callback(type, selectedText)

                // rajouter l'élément sélectionner comme div sous les filtres
                selectionDisplay.innerHTML = `<div class="selectedItem">${this.selectedItem}</div>`

                // afficher dans la console
                console.log(this.selectedItem)
            }
        })
    }
}
