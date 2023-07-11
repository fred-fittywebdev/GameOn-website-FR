// Eléments du DOM et variables -> modale
bodyEl = document.querySelector("body");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseEl = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
// Eléments du DOM et variables -> navigation
let navigation = document.getElementById("myTopnav");
const iconeMenuEl = document.getElementById("icon");

/*
---------- NAVIGATION COMPONENT ----------
*/
// Fonction permettant l'ajout de la classe 'responsive' pour gérer le menu en version mobile.
function editNav() {
  if (navigation.className === "topnav") {
    navigation.className += " responsive";
  } else {
    navigation.className = "topnav";
  }
}

iconeMenuEl.addEventListener("click", editNav);

/*
---------- END NAVIGATION  COMPONENT ----------
*/

/*
---------- MODAL COMPONENT ----------
*/

/**
 * Permet de supprimer les message d'erreur et la bordure rouge autour des inputs.
 */
function initMessages() {
  formEl.classList.add("active");
  formData.forEach((formD) => {
    formD.setAttribute("data-error", "");
    formD.setAttribute("data-error-visible", false);
  });
}
// TODO AJouter la jsdoc et enlever le onclick editnav()
// Fonction permettant d'ouvrir la modale.
function launchModal() {
  window.scrollTo(0, 0);
  bodyEl.classList.add("hidden");
  modalbg.style.display = "block";
}

// Fonction permettant de fermer la modale.
function closeModal() {
  initMessages();
  formEl.reset();
  bodyEl.classList.remove("hidden");
  modalbg.style.display = "none";
}

// Evenements pour l'ouverture de la modale, on écoute le 'click' sur le bouton "je m'inscirs" de la page d'acceuil.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Evenements pour la fermeture de la modale au click sur la croix..
modalCloseEl.addEventListener("click", closeModal);

/*
---------- END MODAL  COMPONENT ----------
*/
