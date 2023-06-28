// Fonction permettant l'ajout de la classe 'responsive' pour gérer le menu en version mobile.
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*
---------- MODAL COMPONENT ----------
*/

// Eléments du DOM et variables
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseEl = document.querySelector('.close')
const formData = document.querySelectorAll(".formData");


// Fonction permettant d'ouvrir la modale.
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction permettant de fermer la modale.
function closeModal() {
  modalbg.style.display = "none";
}


// Evenements pour l'ouverture de la modale, on écoute le 'click' sur le bouton "je m'inscirs" de la page d'acceuil.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Evenements pour la fermeture de la modale au click sur la croix..
modalCloseEl.addEventListener("click", closeModal);


/*
---------- END MODAL  COMPONENT ----------
*/



