
// Recuperation des travaux et categories
let allWorks = []

async function getWorks() {
    try {
        const reponse = await fetch("http://localhost:5678/api/works")
        allWorks = await reponse.json()

        const getCategories = await fetch("http://localhost:5678/api/categories")
        const categories = await getCategories.json()

        getFilters(categories, allWorks)

        displayWorks(allWorks)

    } catch (error) {
            console.error("Impossible de collectionner les donnees", error);
    }
}

// Filtrer les travaux
function getFilters(categories, allWorks) {
    const btnsContainer = document.querySelector(".btns-container")
    btnsContainer.innerHTML = ""

    const allBtn = document.createElement("button")
    allBtn.innerText = "Tous"
    allBtn.addEventListener("click", () => displayWorks(allWorks))
    allBtn.classList.add('btns')
    btnsContainer.appendChild(allBtn) 

    for (let category of categories) {
        const button = document.createElement("button")
        button.innerText = category.name

        button.addEventListener("click", () => {
            const filteredResults = allWorks.filter(work => work.categoryId === category.id)
            displayWorks(filteredResults, ".gallery") 
        })
        button.classList.add('btns')
        btnsContainer.appendChild(button)
    }
}

// Afficher les works
function displayWorks(works) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    for (let work of works) {
        const card = document.createElement("figure")
        const cardImg = document.createElement("img")
        cardImg.src = work.imageUrl
        const cardTitle = document.createElement("figcaption")
        cardTitle.innerText = work.title

        card.appendChild(cardImg)
        card.appendChild(cardTitle)
        gallery.appendChild(card)
    }
}

getWorks()

// Modale modifier projets
const editWindow = document.querySelector(".modal-gallery")
const editBtn = document.getElementById("edit-btn")
const closeBtn = document.querySelector(".close-btn")
const body = document.body

// Afficher projets dans la modale
function displayWorksModal(works) {
    const container = document.querySelector(".projects-container")
    container.innerHTML = ""

    for (let work of works) {
        const card = document.createElement("figure")
        card.classList.add("modal-card")
        const cardImg = document.createElement("img")
        cardImg.classList.add("modal-img")
        cardImg.src = work.imageUrl

        const delBtn = document.createElement("img")
        delBtn.src = "./assets/icons/trash.png"
        delBtn.alt = "Supprimer"
        delBtn.classList.add("delBtn")

        card.appendChild(cardImg)
        card.appendChild(delBtn)
        container.appendChild(card)
    }
}

// Ouvrir
const overlay = document.querySelector(".overlay")

editBtn.addEventListener("click", () => {
    editWindow.classList.remove("modal-hidden")
    editWindow.classList.add("modal-active")
    overlay.classList.add("modal-overlay")
    
    displayWorksModal(allWorks)

})

// Fermer
closeBtn.addEventListener("click", () => {
    editWindow.classList.add("modal-hidden")
    editWindow.classList.remove("modal-active")
    overlay.classList.remove("modal-overlay")
})

overlay.addEventListener("click", () => {
    editWindow.classList.add("modal-hidden")
    editWindow.classList.remove("modal-active")
    overlay.classList.remove("modal-overlay")
})