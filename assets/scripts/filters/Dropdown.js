import {getItemsList} from "../data/getData.js"

export default class Dropdown {
    constructor(type, callback) {
        this.callback = callback
        this.selectedItem = []
        this.type = type
    }

    /**
     * créer le dropdown
     * @param viewInstance
     */
    createDropDown(viewInstance) {
        // récup la div
        const filtersContainer = document.querySelector(".filters")

        // créer un early return
        if (!filtersContainer) return

        // créer un bouton select
        const select = document.createElement("div")
        select.className = "dropdown"

        // créer le dropdown avec une option
        select.innerHTML = `<div class="type">
                                ${this.type}
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>`

        // récupérer la liste des éléments dans un tableau
        const itemsList = getItemsList(this.type)

        // créer une div cachée
        this.hiddenList = document.createElement("div")
        this.hiddenList.className = "hiddenList"

        // créer une ul
        const ulGroupe = document.createElement("ul")

        // boucle pour afficher les items
        this.showItems(itemsList, ulGroupe)

        // append le dropdown à la div
        filtersContainer.appendChild(select).appendChild(this.hiddenList)

        // toggle l'affichage du dropdown
        const typeDiv = select.querySelector(".type")
        typeDiv.addEventListener("click", () => {
            this.toggle()
        })

        // sélectionner la div pour afficher les LI sélectionner
        const selectionDisplay = document.querySelector('.selectionDisplay')

        // créer un itemFilterSelectedDiv conteneur pour tous les items sélectionnés
        this.itemFilterSelectedDiv = document.createElement('div')
        this.itemFilterSelectedDiv.className = 'itemFilterSelectedDiv'
        selectionDisplay.appendChild(this.itemFilterSelectedDiv)

        // rajouter un champ de recherche
        this.createSearchInput(ulGroupe)

        // rajouter un click sur le LI
        this.hiddenList.addEventListener("click", (event) => {
            if (event.target.tagName === 'LI') {
                this.selectItem(event, this.itemFilterSelectedDiv)
            }
        })
    }

    /**
     * Créer un champ de recherche
     * @param ulGroupe
     */
    createSearchInput(ulGroupe) {
        // ajouter un champ de recherche en haut du dropdown
        const searchContainer = document.createElement('div')
        const searchFlex = document.createElement("div")
        const searchInput = document.createElement('input')
        const clearButton = document.createElement('span')

        searchContainer.className = 'searchContainer'
        searchFlex.className = 'searchFlex'
        searchInput.className = 'search-input'
        searchInput.placeholder = `Rechercher ${this.type.toLowerCase()}`

        // Add the clear button (X) next to the search input
        clearButton.className = 'clear-button'
        clearButton.textContent = 'X'  // X character

        // Hide the clear button initially
        clearButton.style.display = 'none'

        // append child input sur le conteneur
        searchContainer.appendChild(searchFlex).appendChild(searchInput)
        searchContainer.appendChild(searchFlex).appendChild(clearButton)

        // insérer la div avant les ul
        this.hiddenList.insertBefore(searchContainer, ulGroupe)

        // afficher le bouton X quand l'input n'est pas vide
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                clearButton.style.display = 'inline'
            } else {
                clearButton.style.display = 'none'
            }
        })

        // vider le champ en cliquant sur X
        clearButton.addEventListener('click', () => {
            searchInput.value = ''
            clearButton.style.display = 'none'

            // Show all items after clearing
            this.hiddenList.querySelectorAll("li").forEach(item => {
                item.style.display = "block"
            })
        })

        this.filterItemsList()
    }

    /**
     * Boucle pour afficher les items
     * @param itemsList
     * @param ulGroupe
     */
    showItems(itemsList, ulGroupe) {
        // boucle pour afficher en liste
        itemsList.forEach(item => {
            const listItem = document.createElement("li")
            listItem.textContent = item
            this.hiddenList.appendChild(ulGroupe).appendChild(listItem)
        })
    }

    /**
     * Toggle la class 'show'
     */
    toggle() {
        // toggle l'affichage
        this.hiddenList.classList.toggle('show')

        // rotation de la fleche
        const arrow = this.hiddenList.parentElement.querySelector('.fa-chevron-down')
        arrow.classList.toggle('rotate')
    }

    /**
     * Sélectionner l'item
     * @param event
     * @param selectionDisplay
     */
    selectItem(event, selectionDisplay) {
        // masqué l'élément sélectionner
        const selectedLi = event.target
        selectedLi.classList.add('hidden')

        this.toggle()

        // récupérer le text event
        const selectedText = event.target.textContent

        // vérifier si l'item a déjà été sélectionné
        if (this.selectedItem.includes(selectedText)) {return}

        // push l'historique
        this.selectedItem.push(selectedText)

        // callback
        this.callback(this.type, selectedText)

        // console.log(this.callback(this.type, selectedText))

        // mettre a jour l'item sélectionner
        this.updateItemsList(this.itemFilterSelectedDiv)
    }

    /**
     * Mettre a jour la list des items
     * @param itemFilterSelectedDiv
     */
    updateItemsList(itemFilterSelectedDiv) {
        // vider l'affichage
        itemFilterSelectedDiv.innerHTML = ''

        // boucle pour rajouter l'item avec un addEvent pour supprimer
        this.selectedItem.forEach((itemText, index) => {
            const itemDiv = document.createElement('div')
            const itemName = document.createElement('div')
            const xMark = document.createElement('div')
            xMark.innerHTML = `<i class="fa-solid fa-xmark"></i>`

            itemDiv.className = 'selectedItem'
            itemName.textContent = itemText
            xMark.className = 'xMark'

            // supprimer l'élément au clic
            xMark.addEventListener('click', () => {
                this.removeItem(itemText, itemFilterSelectedDiv)
            })

            // ajouter l'item et le xMark dans le itemFilterSelectedDiv
            itemFilterSelectedDiv.appendChild(itemDiv).appendChild(itemName)
            itemFilterSelectedDiv.appendChild(itemDiv).appendChild(xMark)
        })
    }

    /**
     * Supprimer l'item et le remettre dans la liste
     * @param itemText
     * @param selectionDisplay
     */
    removeItem(itemText, selectionDisplay) {
        // retirer l'élément de la liste ul>li
        this.selectedItem = this.selectedItem.filter(item => item !== itemText)

        // trouver le li qui correspondant dans le dropdown
        const allItems = Array.from(this.hiddenList.querySelectorAll('li'))
        const itemLi = allItems.find(li => li.textContent === itemText)

        // si on trouve l'élément, le réafficher dans la liste
        if (itemLi) {
            itemLi.classList.remove('hidden')
        }

        // mettre a jour l'item list
        this.updateItemsList(selectionDisplay)
    }

    filterItemsList() {
        const searchInput = document.querySelector(".search-input")

        // ajouter un addEventListener sur input
        searchInput.addEventListener("input", ()=>{
            const query = searchInput.value.toLowerCase()

            // commencer le filtering apres 3 caractères
            if (query.length < 3) {
                this.hiddenList.querySelectorAll("li").forEach(item => {
                    item.style.display = "block"
                })
                return
            }

            this.hiddenList.querySelectorAll("li").forEach(item => {
                const itemText = item.textContent.toLowerCase()
                if (itemText.includes(query)) {
                    item.style.display = "block"
                } else {
                    item.style.display = "none"
                }
            })
        })
    }
}