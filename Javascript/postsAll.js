const template = document.querySelector("template").content
const posts__ul = document.querySelector(".posts__ul")
const handleNonePosts = () => {
    console.log(false)
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
           
            posts__ul.appendChild(clone)
        }
    }else{
        handleNonePosts("Hali dasturda post yozilmagan")
    }
}
const handleDefaultRequest = () => {
    axios.get(`${SERVER}/posts`).then(response => handleRenderPosts(response.data))
}
handleDefaultRequest()