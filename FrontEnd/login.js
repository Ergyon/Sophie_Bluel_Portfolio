async function sendUserId () {
    const loginForm = document.querySelector(".login-form")
    const mailInput = document.querySelector("[name=user_mail]")
    const passwordInput = document.querySelector("[name=user_password]")

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const loginData = {
            email: document.querySelector("[name=user_mail]").value, 
            password: document.querySelector("[name=user_password]").value, 
        }
        const userIds = JSON.stringify(loginData)

        try { 
            const sendLoginData = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: userIds
            })
            
            if (!sendLoginData.ok) {
                mailInput.classList.add("input-error")
                passwordInput.classList.add("input-error")
                return
            }

            const response = await sendLoginData.json()

            localStorage.setItem("token", response.token)
            localStorage.setItem("userId", response.userId)

            window.location.href = "index.html"
        } catch (error) {
            console.error("Erreur lors de la requête :", error)
        }
    })
    mailInput.addEventListener("input", () => {
        mailInput.classList.remove("input-error")
    })
    passwordInput.addEventListener("input", () => {
        passwordInput.classList.remove("input-error")
    })
}

sendUserId()
