/*
---------- NAVIGATION COMPONENT ----------
*/
// Fonction permettant l'ajout de la classe 'responsive' pour gérer le menu en version mobile.
function editNav() {
  let navigation = document.getElementById("myTopnav");
  if (navigation.className === "topnav") {
    navigation.className += " responsive";
  } else {
    navigation.className = "topnav";
  }
}
/*
---------- END NAVIGATION  COMPONENT ----------
*/

/*
---------- MODAL COMPONENT ----------
*/

// Eléments du DOM et variables
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseEl = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");

/**
 * Permet de supprimer les message d'erreur et la bordure rouge autour des inputs.
 */
function initMessages() {
  formData.forEach((formD) => {
    formD.setAttribute("data-error", "");
    formD.setAttribute("data-error-visible", false);
  });
}

// Fonction permettant d'ouvrir la modale.
function launchModal() {
  modalbg.style.display = "block";
}

// Fonction permettant de fermer la modale.
function closeModal() {
  initMessages();
  formEl.reset();
  modalbg.style.display = "none";
}

// Evenements pour l'ouverture de la modale, on écoute le 'click' sur le bouton "je m'inscirs" de la page d'acceuil.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Evenements pour la fermeture de la modale au click sur la croix..
modalCloseEl.addEventListener("click", closeModal);

/*
---------- END MODAL  COMPONENT ----------
*/
