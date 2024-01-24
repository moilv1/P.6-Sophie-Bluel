const body = document.querySelector("body");
const header = document.querySelector("header");
const portfolioTITLE = document.querySelector("#portfolio h2");
const modalBox = document.querySelector("dialog");
const modalContent = document.querySelector("modal_content");
const closemodal = document.querySelector(".modal .modaldelete .modal_closing_icon")
console.log(closemodal);

 
//Creation de la bannière et bouton édition//
let editingBanner;
let editingButton;

const createBannner = () => {
    editingBanner = document.createElement("div");
    editingBanner.classList.add("editingbanner");
    editingBanner.innerHTML = `<i class="fa-regular fa-pen-to-square modal_trigger"></i>
    <p>Mode édition</p>`;
};

const createEditingButton = (id) => {
    editingButton = document.createElement("button");
    editingButton.classList.add("edit_button");
    editingButton.setAttribute("id", id);
    editingButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
    <p>modifier</p>`;
};

//Mise en place des éléments admin 
if (localStorage.token) {
    createBannner();
    body.insertBefore(editingBanner, header);
    createEditingButton("Modifier_boutton");
    portfolioTITLE.append(editingButton);
}

// Déconnexion 
function removeToken() {
    localStorage.removeItem("token");
}
window.addEventListener("unload", removeToken);


// Ouverture de la Modale
editingButton.addEventListener("click", () => {
    addingProjets()
    modalBox.showModal();
    
})

// Fermeture de la Modale 
closemodal.addEventListener("click", () => {
    modalBox.close();
})


// ajout des projets dans la modal 
// modalContent
function addingProjets() {
    fetch(APIpathWorks)
    .then((reponse) => {
        if (reponse.ok) {
            return reponse.json();
        } else {
            throw new Error("echec lors de l'appel API.");
        }
    })
}



