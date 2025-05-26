async function sendUserId () {
    const loginForm = document.querySelector(".login-form")
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const loginData = {
            email: document.querySelector("[name=user_mail]").value, 
            password: document.querySelector("[name=user_password]").value, 
        }
        const userIds = JSON.stringify(loginData)

        const sendLoginData = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: userIds
        })
        
        if (!sendLoginData.ok) {
            console.log("Erreur dans la reponse http")
            return
        }

        console.log("En attente de la reponse")
        const response = await sendLoginData.json()
        console.log("reponse json :", response)
    })
}

sendUserId()
