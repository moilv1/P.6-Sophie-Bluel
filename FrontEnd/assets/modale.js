const body = document.querySelector("body");
const header = document.querySelector("header");
const introduction = document.querySelector("#introduction");
const portfolioTITLE = document.querySelector("#portfolio h2");
console.log(portfolio);


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
    console.log(editingButton);
};


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



