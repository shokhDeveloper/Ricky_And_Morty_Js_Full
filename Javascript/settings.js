window.addEventListener("load", () => {
    "use strict"
    const date = new Date()
    const user  = JSON.parse(window.localStorage.getItem("user_ricky"))
    const form = document.querySelector("form")
    let child_settings = document.querySelector(".child_settings")
    let inputs = child_settings.querySelectorAll("input")
    const submit_btn = document.querySelector(".submit_btn")
    submit_btn.classList.add("d-none")
    let settings_btn = document.querySelector(".tahrirlash")
    const handleRenderSettings = (user) => {
        for(let i = 0; i<user.length; i++){
            let name_input = child_settings.querySelector("#name")
            name_input.value = user[i].name
            let lastname_input = child_settings.querySelector("#lastname")
            lastname_input.value = user[i].lastname
            let email_input = child_settings.querySelector("#email")
            email_input.value = user[i].email
            let password_input = child_settings.querySelector("#password")
            password_input.value = "Password"
        }
    }
    const handleClick = (event) => {
        inputs.forEach(item => {
            item.readOnly = false
        })
        event.target.classList.remove("d-block")
        event.target.classList.add("d-none")
        submit_btn.classList.remove("d-none")
        submit_btn.classList.add("d-block")
    }
    settings_btn.addEventListener("click", handleClick)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        axios.put(`${SERVER}/users/${user.id}`, {
            name: data.get("name"),
            lastname: data.get("lastname"),
            email: data.get("email"),
            password: data.get("password"),
            date:  `${date.toLocaleString()} Update-it in user`
        }).then(response => {
                window.localStorage.setItem("user_ricky", JSON.stringify(response.data))
                submit_btn.classList.remove("d-block")
                submit_btn.classList.add("d-none")
                settings_btn.classList.remove("d-none")
                settings_btn.classList.add("d-block")
                handleRenderSettings([JSON.parse(window.localStorage.getItem("user_ricky"))])
        })
    }
    form.addEventListener("submit", handleSubmit)
    handleRenderSettings([user])
})