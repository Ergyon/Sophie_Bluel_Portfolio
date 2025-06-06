
// Recuperation des travaux et categories
async function getWorks() {
    try {
        const reponse = await fetch("http://localhost:5678/api/works")
        const works = await reponse.json()

        const getCategories = await fetch("http://localhost:5678/api/categories")
        const categories = await getCategories.json()

        getFilters(categories, works)

        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = ""

        for (let i = 0; i < works.length; i++) {
            const work = works[i]
            const workArticle = document.createElement("figure")

            const workImg = document.createElement("img")
            workImg.src= work.imageUrl
            workImg.alt = work.title

            const workTitle = document.createElement("figcaption")
            workTitle.innerText = work.title

            workArticle.appendChild(workImg)
            workArticle.appendChild(workTitle)
            gallery.appendChild(workArticle)
        } 
    } catch (error) {
            console.error("Impossible de collectionner les donnees");
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
            displayWorks(filteredResults) 
        })
        button.classList.add('btns')
        btnsContainer.appendChild(button)
    }
}

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

// Ouvrir
editBtn.addEventListener("click", () => {
    editWindow.classList.remove("modal-hidden")
    editWindow.classList.add("modal-active")
    body.classList.add("modal-overlay")
})
// Fermer
closeBtn.addEventListener("click", () => {
    editWindow.classList.add("modal-hidden")
    editWindow.classList.remove("modal-active")
    body.classList.remove("modal-overlay")
})

editWindow.addEventListener("click", (e) => { 
    if (e.target !== editWindow) {
        editWindow.classList.add("modal-hidden")
        editWindow.classList.remove("modal-active")
        body.classList.remove("modal-overlay")
    }
})