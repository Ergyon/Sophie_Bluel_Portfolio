
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

// Afficher les projets
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

// Afficher projets dans la modale, avec btn de suppression
function displayWorksModal(works) {
    const container = document.querySelector(".projects-container")
    container.innerHTML = ""

    for (let work of works) {
        const card = document.createElement("figure")
        card.classList.add("modal-card")
        card.dataset.id = work.id

        const cardImg = document.createElement("img")
        cardImg.classList.add("modal-img")
        cardImg.src = work.imageUrl

        const delBtn = document.createElement("img")
        delBtn.src = "./assets/icons/trash.png"
        delBtn.alt = "Supprimer"
        delBtn.classList.add("delBtn")

        // Suuprimer un projet 
        delBtn.addEventListener("click", (e) => {
            const workSelected = e.target.closest(".modal-card")
            const workId = workSelected.dataset.id
            deleteWork(workId)
            // console.log("Projet", workId)
        })

        card.appendChild(cardImg)
        card.appendChild(delBtn)
        container.appendChild(card)
    }
}

// Modale modifier projets
const overlay = document.querySelector(".modal-overlay");
const editWindow = document.querySelector(".modal-gallery");
const editBtn = document.getElementById("edit-btn");
const closeBtn = document.querySelector(".close-btn");

// Ouvrir
editBtn.addEventListener("click", () => {
	editWindow.classList.remove("modal-hidden");
    overlay.classList.remove("modal-hidden")
	displayWorksModal(allWorks);
});

// Fermer
function closeModal() {
	editWindow.classList.add("modal-hidden");
    overlay.classList.add("modal-hidden")
}
overlay.addEventListener("click", closeModal);

closeBtn.addEventListener("click", closeModal);

// Supprimer
async function deleteWork(workId) {
    const token = localStorage.getItem("token")
    const url = `http://localhost:5678/api/works/${workId}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        
        if (response.ok) {
            document.querySelector(`[data-id="${workId}"]`).remove()
        } else {
            alert("Vous n'avez pas les droits")
        }
        
    } catch (error) {
        console.error("Erreur :", error)
        alert("Impossible de se connecter au serveur")
    }
}