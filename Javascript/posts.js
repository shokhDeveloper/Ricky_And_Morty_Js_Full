const date = new Date()
let modal_overlay = document.querySelector(".modal_overlay")
const form = modal_overlay.querySelector("form")
let template = document.querySelector("template").content
const user = JSON.parse(window.localStorage.getItem("user_ricky"))
let posts_add_btn = document.querySelector(".posts_add_btn")
let modal_overlay_update = document.querySelector(".modal_overlay_update")
let form_update = modal_overlay_update.querySelector("form")
const posts__ul = document.querySelector(".posts__ul")
let x_btn = document.querySelector(".x_btn")
let x_btn_2 = document.querySelector(".x_btn_2")
const handleClick = (event) => {
    switch(event.target.id){
        case "x":{
            modal_overlay.classList.remove("d-flex")
            modal_overlay.classList.add("d-none")
            modal_overlay_update.classList.remove("d-flex")
            modal_overlay_update.classList.add("d-none")
        }break;
        case "add":{
            modal_overlay.classList.add("d-flex")
            modal_overlay.classList.remove("d-none")
        }break;
        
    }
}
x_btn_2.addEventListener("click", handleClick)
const handleNonePosts = (text) => {
    const h1 = document.createElement("h1")
    h1.textContent = text
    h1.classList.add("text-danger")
    posts__ul.appendChild(h1)
}
const handleRenderPosts = (arr) => {
    if(arr?.length){
        posts__ul.innerHTML =  null
        for(let i = 0; i<arr.length; i++){
            let clone = template.cloneNode(true)
            let title = clone.querySelector("h3")
            title.textContent = arr[i].title
            let body = clone.querySelector("h5")
            body.textContent = arr[i].body
            let avtor = clone.querySelector("h6")
            avtor.textContent = arr[i].user_name
            let delete_btn = clone.querySelector(".delete")
            delete_btn.dataset.id = arr[i].id
            let update_btn = clone.querySelector(".update")
            update_btn.dataset.id = arr[i].id
            posts__ul.appendChild(clone)
        }
    }else{
        handleNonePosts("Hali sizning postlaringiz mavjud emas")
    }
}
const handleGetPosts = () => {
    axios.get(`${SERVER}/posts?user_id=${user.id}`).then(response =>handleRenderPosts(response.data))
}
x_btn.addEventListener("click", handleClick)
posts_add_btn.addEventListener("click", handleClick)
const handleSub = (event) => {
    event.preventDefault()
    let data = new FormData(event.target)
    axios.post(`${SERVER}/posts`,{
        title: data.get("title"),
        body: data.get("body"),
        date: `${date.toLocaleString()} create-At in post`,
        user_name: `${user.name} ${user.lastname}`,
        user_id : user.id
    }).then(response => {
        if(response.status === 201){
            modal_overlay.classList.remove("d-flex")
            modal_overlay.classList.add("d-none")
            handleGetPosts()
        }    
    })    
}    

form.addEventListener("submit", handleSub)
let update_id = 0
function handleUpdate (id)  {
    update_id = id
    modal_overlay_update.classList.add("d-flex")
    modal_overlay_update.classList.remove("d-none")
    axios.get(`${SERVER}/posts/${id}`).then(response => {
        let data = response.data    
        let form = modal_overlay_update.querySelector("form")
        let title_input = form.querySelector("#title")
        title_input.value = data.title
        let body = form.querySelector("#body")
        body.value = data.body
    })
}   
const handleUpdatePost = (event) => {
    event.preventDefault()  
    let data = new FormData(event.target)
    axios.put(`${SERVER}/posts/${update_id}`, {
        title: data.get("title"),
        body: data.get("body"),
        date: `${date.toLocaleString()} Update-id its post`,
        user_id: user.id,
        user_name: `${user.name} ${user.lastname}`
    }).then(response => console.log(response.data))
}
window.addEventListener("click", (event) => {
    if(event.target.matches(".delete")){
       let id = event.target.dataset.id
       axios.delete(`${SERVER}/posts/${id}`).then(response => console.log(response))
    }else if(event.target.matches(".update")){
        let id = event.target.dataset.id-0
        handleUpdate(id)
    }
})
form_update.addEventListener("submit", handleUpdatePost)
handleGetPosts()