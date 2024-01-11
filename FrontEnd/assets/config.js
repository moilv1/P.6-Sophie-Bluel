let projets; 
const divFilter = document.getElementById("filter-bar");
const divGallery = document.querySelector(".gallery");

async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    projets = await response.json();
    return projets;
}

fetchWorks().then(projets => {
    afficherElements(projets);
})

function afficherElements(projets) {
    for(let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = projet.imageUrl;

        const caption = document.createElement("figcaption");
        caption.innerText = projet.title;

        figure.setAttribute("data-id", `${projet.categoryId}`);
        figure.setAttribute("data-projetid", `${projet.id}`);
        
        figure.appendChild(img);
        figure.appendChild(caption);

        divGallery.appendChild(figure);
    }
}


// btn tous
let btnTous = document.createElement("button");
btnTous.classList.add("button");
btnTous.innerText = "Tous";
btnTous.classList.add("button_select");
divFilter.appendChild(btnTous);

btnTous.addEventListener("click", () =>{
    divGallery.innerHTML = "";
    afficherElements(projets);

    btnTous.classList.add("button_select");
    btnObjets.classList.remove("button_select");
    btnAppartements.classList.remove("button_select");
    btnHR.classList.remove("button_select");
})

// btn Objets
let btnObjets = document.createElement("button");
btnObjets.classList.add("button");
btnObjets.innerText = "Objets";
divFilter.appendChild(btnObjets);

btnObjets.addEventListener("click", () =>{
    const projetsObjets = projets.filter(function (p){
        return p.categoryId == 1;
    })

    btnTous.classList.remove("button_select");
    btnObjets.classList.add("button_select");
    btnAppartements.classList.remove("button_select");
    btnHR.classList.remove("button_select");  
      
    divGallery.innerHTML = "";
    afficherElements(projetsObjets);
})

// btn Appartements
let btnAppartements = document.createElement("button");
btnAppartements.classList.add("button");
btnAppartements.innerText = "Appartements";
divFilter.appendChild(btnAppartements);

btnAppartements.addEventListener("click", () =>{
    const projetsAppartements = projets.filter(function (p){
        return p.categoryId == 2;
    })

    btnTous.classList.remove("button_select");
    btnObjets.classList.remove("button_select");
    btnAppartements.classList.add("button_select");
    btnHR.classList.remove("button_select");

    divGallery.innerHTML = "";
    afficherElements(projetsAppartements);

})

// btn Hôtels & Restaurants
let btnHR = document.createElement("button");
btnHR.classList.add("button");
btnHR.innerText = "Hôtels & Restaurants";
divFilter.appendChild(btnHR);

btnHR.addEventListener("click", () =>{
    const projetsHR = projets.filter(function (p){
        return p.categoryId == 3;
    })

    
    btnTous.classList.remove("button_select");
    btnObjets.classList.remove("button_select");
    btnAppartements.classList.remove("button_select");
    btnHR.classList.add("button_select");


    divGallery.innerHTML = "";
    afficherElements(projetsHR);

})
