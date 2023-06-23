const user = JSON.parse(window.localStorage.getItem("user_ricky"))
let akkaunt_case = document.querySelector(".akkaunt_case")
let template = document.querySelector("template").content
let episode__select = document.querySelector(".episode__select")
let character__items = document.querySelector(".character__items")
let episode_name = document.querySelector(".episode_name")
let episode_date = document.querySelector(".episode_date")  
akkaunt_case.textContent = `${user.name[0]}.${user.lastname[0]}`
const handleRenderCharacter = (location, arr) => {
    if(arr?.length){
        episode_name.textContent = location.name
        episode_date.textContent = location.air_date
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
const handleFilterCharacter = (arr) => {
    return(
        Promise.all(
            arr.map(item => {
                return(
                    fetch(item).then( response => {
                        return response.json()
                    })
                )
            })
        )
    )
}
const handleCreateOptions = (number) => {
    let array = [...Array(number).keys()]
    for(let i = 0; i<array.length; i++){
        let option = document.createElement("option")
        option.value = i+1
        option.textContent  = `${i+1}-Location`
        episode__select.appendChild(option)
    }
}
const handleLocation = () => {
    axios.get(`${BASE_URL}/location`)
    .then(response => {  
       handleCreateOptions(response.data.info.count)
    })
}
const getDefaultRequst = () => {
    axios.get(`${BASE_URL}/location/1`)
    .then(response => {  
        let result = handleFilterCharacter(response.data.residents)
          result.then(data => handleRenderCharacter(response.data, data))
    })
}
const handleChange = (event) => {
    axios.get(BASE_URL + `/location/${event.target.value-0}`).then(response => {
        let character = handleFilterCharacter(response.data.residents)
        character.then(data => handleRenderCharacter(response.data,  data))
    })
}
episode__select.addEventListener("change", handleChange)
getDefaultRequst()
handleLocation()