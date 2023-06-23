const user = JSON.parse(window.localStorage.getItem("user_ricky"))
let akkaunt_case = document.querySelector(".akkaunt_case")
let template = document.querySelector("template").content
let search_characters = document.querySelector(".search_characters")
let character__items = document.querySelector(".character__items")
let pagination_buttons = document.querySelectorAll(".pagination_btn")
let pages = document.querySelectorAll(".page-item")
const filterby_status = document.querySelectorAll(".filterby_status button")
const gender_btns = document.querySelectorAll(".gender_btns button")
const species_btns = document.querySelectorAll(".species_btns button")
akkaunt_case.textContent = `${user.name[0]}.${user.lastname[0]}`
const handleRenderCharacter = (arr) => {
    if(arr?.length){
        character__items.innerHTML = null   
        for(let i = 0; i<arr.length; i++){
            let clone = template.cloneNode(true)
            let img = clone.querySelector("img")
            img.src = arr[i].image
            let character_status = clone.querySelector(".character_status")
            if(arr[i].status === "Dead"){
                character_status.classList.remove("bg-success")
                character_status.classList.add("bg-danger")
            }else if(arr[i].status === "unknown"){
                character_status.classList.remove("bg-success")
                character_status.classList.add("bg-secondary")   
            }
            character_status.textContent = arr[i].status
            let character_name = clone.querySelector(".character_name")
            character_name.textContent = arr[i].name?.split(" ").length > 2 ? `${arr[i].name.split(" ").slice(0, 2).join(" ")} ... `: arr[i].name
            character__items.appendChild(clone)
        }
    }
}   
let max = null
const handleDefaultRequest = () => {
    axios.get(BASE_URL+"/character").then(response => {
        max = response.data.info.pages
        handleRenderCharacter(response.data.results)
    }).catch(error => console.log(error))
}
const handleStatusFilterClick = (event) => {
    axios.get(BASE_URL+`/character?status=${event.target.id}`).then(response => {
            max = response.data.info.pages
            handleRenderCharacter(response.data.results)
    })
}
filterby_status.forEach(item => {
    item.addEventListener("click", handleStatusFilterClick)
})
const handleGenderFilterClick = (event) => {
    axios.get(BASE_URL+`/character?gender=${event.target.id}`).then(response => {
            max = response.data.info.pages
            handleRenderCharacter(response.data.results)
    })
}
gender_btns.forEach(item => {
    item.addEventListener("click", handleGenderFilterClick)
})
const handleSpeciesFilterClick = (event) => {
    axios.get(BASE_URL+`/character?species=${event.target.id}`).then(response => {
            max = response.data.info.pages
            handleRenderCharacter(response.data.results)
    })
}
species_btns.forEach(item => {
    item.addEventListener("click", handleSpeciesFilterClick)
})
const handleChange = (event) => {
    axios.get(BASE_URL+`/character?name=${event.target.value}`).then(response => {
        max = response.data.info.pages
        handleRenderCharacter(response.data.results)
    }).catch(error => console.log(error))
}
search_characters.addEventListener("keyup", handleChange)
function handleCreateButtons(event){
    let maxPage = []
    let minPage = []
    switch(event.target.id){
        case "next":{
            pages.forEach(item => {
                maxPage = [...maxPage, item.textContent-0]
            })
            maxPage = Math.max(...maxPage)
            pages.forEach(item => {
                if(max > maxPage)  {
                    item.textContent = Number(item.textContent)+1
                }else{
                    return false
                }
            })
        }break;
        case "previous":{
            pages.forEach(item => {
                minPage = [...minPage, item.textContent-0]
            })
            minPage = Math.min(...minPage)
            pages.forEach(item => {
                if(minPage > 1 )  {
                    item.textContent = Number(item.textContent)-1
                }else{
                    return false
                }
            })
        }
    }
}
const handlePageChange = (event) => {
    if(event.target.matches(".page-item")){
        let text = event.target.textContent-0
        axios.get(BASE_URL+`/character?page=${text}`).then(response => {
            handleRenderCharacter(response.data.results)
        }).catch(error => console.log(error))
    }
}
pagination_buttons.forEach(item => {
    item.addEventListener("click", handleCreateButtons)
})
window.addEventListener("click", handlePageChange)
handleDefaultRequest()