const body = document.querySelector("body");
const modal_trigger = document.querySelector("modal_trigger");
const header = document.querySelector("header");
const portfolioTITLE = document.querySelector("#portfolio h2");
const modalBox = document.querySelector("dialog");
const modalContent = document.querySelector(".modal_content");
const closetrig1 = document.querySelector(".modal .modaldelete .modal_closing_icon");
const closetrig2 = document.querySelector(".modal .modaladding .icons .modal_closing_icon");
const addButton = document.querySelector(".modal .modaldelete .add-photo");
const modalDelete = document.getElementById("modaldelete");
const modalAdding = document.getElementById("modaladding");
const previous_icon = document.querySelector(".previous_icon");
const Image_preview = document.querySelector(".image_preview");
const boxImage_preview = document.getElementById("image");
const Image_upload =document.getElementById("image_upload");
const LabelUpload = document.querySelector(".uploadcontainer label");
const fa_image = document.getElementById("fa-image");
const text_format =document.getElementById("text_format");
const titre = document.getElementById("Titleinput");
const select = document.getElementById("category_input");
const formModale = document.querySelector(".formModale");
const valide_button = document.getElementById("modal_form_validation");




 
//Creation de la bannière et bouton édition//
let editingBanner;
let editingButton;

const createBannner = () => {
    editingBanner = document.createElement("div");
    editingBanner.classList.add("editingbanner");
    editingBanner.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
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
};
window.addEventListener("unload", removeToken);

// Ouverture de la Modale
function openModal() {
    addingProjets();
    modalBox.showModal();
};

editingButton.addEventListener("click", () => {
    openModal();
    modalAdding.classList.replace("modaladding_active", "modaladding");
    modalDelete.classList.replace("modaldelete_disabled", "modaldelete");
});

// Fermeture de la Modale 
function ModalClose() {
    modalContent.innerHTML = "";
    modalBox.close();
};

closetrig1.addEventListener("click", ModalClose );
closetrig2.addEventListener("click", ModalClose );

modalBox.addEventListener("click", (event) => {
    if(event.target === modalBox) {
        ModalClose();
    };
});


// ouverture modal addingphoto

function Gotomodaladding() {
    modalAdding.classList.replace("modaladding", "modaladding_active");
    modalDelete.classList.replace("modaldelete", "modaldelete_disabled");
    ResFormAdding();
};
addButton.addEventListener("click", Gotomodaladding );

// retour à la modalDelete
function GoBackModalDelete() {
    modalAdding.classList.replace("modaladding_active", "modaladding");
    modalDelete.classList.replace("modaldelete_disabled", "modaldelete");
    ResFormAdding();
};

previous_icon.addEventListener("click", GoBackModalDelete);

// reset formulaire modaladding 
function ResFormAdding() {
    Image_preview.src = "";
    Image_upload.value = ""
    titre.value = "";
    valide_button.style.background = "#A7A7A7";
    boxImage_preview.style.display = "none";
    LabelUpload.style.visibility = "visible";
    fa_image.style.visibility = "visible";
    text_format.style.visibility = "visible";
}

// ajout des projets dans la modal 
// modalContent
function addingProjets() {
    fetch(APIpathWorks)
    .then((reponse) => {
        if (reponse.ok) {
            return reponse.json();
        } else {
            throw new Error("echec lors de l'appel API.");
        };
    })
    .then((data) => {
        data.forEach((element) => {
            const Card = document.createElement("figure");
            const image = document.createElement("img");
            const description = document.createElement("figcaption");  

            Card.className = "Card";
            image.src = element.imageUrl;
            description.innerHTML = `<button <i class="fa-regular fa-trash-can"></i></button`;
            description.setAttribute("id", "deleteBtn");

            // Suprimer un projet ciblé

            description.addEventListener('click', (e) => {
                fetch(`http://localhost:5678/api/works/${element.id}`, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                  },
                })
                  .then(response => {
                    if (response.ok) {
                      Card.remove();
                      alert("Projet supprimé avec succès !");
                    }
                });
            });

            modalContent.appendChild(Card);
            Card.appendChild(image);
            Card.appendChild(description);
        })
        
    })
}


// Réalisation de la preview de l'image 
Image_upload.addEventListener('change', function () {
    const file = this.files[0];
    if (file){
        const reader = new FileReader();
        boxImage_preview.style.display = "flex";

        reader.addEventListener("load", function() {
            LabelUpload.style.visibility = "hidden";
            fa_image.style.visibility = "hidden";
            text_format.style.visibility = "hidden";

            Image_preview.setAttribute("src", this.result);
            
        });
        reader.readAsDataURL(file);
    }
});

///verification des champs pour coloration du boutton "valider"
formModale.addEventListener("input", () => {
    if (titre.value.length >= 1 && Image_upload.value != "") {
        valide_button.style.background = "#1D6154"
    }
})

// ajout projet dans l'api 
formModale.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("image", Image_upload.files[0]);
    formData.append("title", titre.value);
    formData.append("category", select.value);
  
    fetch(APIpathWorks, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    }).then((reponse) => {
      if (reponse.ok) {
        alert("Projet ajouté avec succès !");
      } else {
        alert("Le formulaire est incomplet!");
      }
    });
});