

//ketika page load 
window.addEventListener("load", ()=>{
    let windowSearch = window.location.search
    let params = new URLSearchParams(windowSearch)
    let success = params.get("success")
    console.info(success)

    if(success == "true"){
        let alt = document.getElementById("alert")
        alt.classList.remove("visually-hidden")
        alt.classList.add("show")
    }
    getPostData()
})


const getPostData = ()=>{

    let card_container = document.getElementById("card_container")
    let carousel_inner = document.getElementById("carousel_inner")


    fetch("/api/post_read", {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        data.query.map((e , i)=>{
            card_container.innerHTML += `
            <div class="card w-100 p-4 mb-4">
            <h3 class="card-title">
              ${e.title} , ${e.author}
            </h3>
            <small class="mb-4 text-sm">${e.author}/ ${moment(e.createdAt).format("dddd, DD-MMMM-YYYY hh:mm")}</small>
            <img src="${e.filelocation}" alt="" class="card-img">
            <details class="card-body">
                <summary>
                    TAMPIKAN CONTENT               
                </summary>
                <p>${e.content}</p>
            </details>
            </div>
            `

            carousel_inner.innerHTML += `
            <div class="carousel-item ${i == 0 ? `active` : null}">
                <img src="${e.filelocation }" class="d-block w-100" alt="...">
            </div>
            `
        })
    })
    .then(err => {
        console.error(err)
    })
}

const refresh = ()=>{
    window.location.href = "/"
}

