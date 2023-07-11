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

/**
 *  Permet d'ouvrir et de fermer le manu au click sur l'icone en mode responsive.
 */
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

/**
 * Permet d'ouvrir la modale et de gérer l'overflow du body lorsque celle-ci est ouverte
 * Cela permet de ne pas povoir scroller lorsque la navigation est ouverte.
 */
function launchModal() {
  window.scrollTo(0, 0);
  bodyEl.classList.add("hidden");
  modalbg.style.display = "block";
}

/**
 *  Permet de fermer la modale
 *  Si la modale est fermée en cours de remplissage, cela vide le formulaire et enlève les messages d'erreurs.
 */
function closeModal() {
  initMessages();
  formEl.reset();
  bodyEl.classList.remove("hidden");
  messageRemerciement.className = "inactive";
  formEl.className = "active";
  modalbg.style.display = "none";
}

// Evenements pour l'ouverture de la modale, on écoute le 'click' sur le bouton "je m'inscirs" de la page d'acceuil.
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Evenements pour la fermeture de la modale au click sur la croix..
modalCloseEl.addEventListener("click", closeModal);

/*
---------- END MODAL  COMPONENT ----------
*/

/*
---------- MODAL REMERCIEMENT COMPONENT ----------
*/

/**
 * Fonction pour faire apparaître la modale de confirmation
 */
function modalRemerciement() {
  //Masquer le formulaire d'origine
  formEl.className = "inactive";

  //Afficher le message et le bouton de fermeture
  messageRemerciement.className = "active";

  //Masque le bouton pour fermer la fenêtre car si utilisateur clique dessus, pas de submit()
  // modalCloseEl.className = "inactive";
}

btnMerci.addEventListener("click", function event() {
  //Masquer le message
  messageRemerciement.className = "inactive";
  // réactivation du formulaire initial.
  formEl.className = "active";
  //fermeture de la modale
  closeModal();
});

/*
---------- END MODAL REMERCIEMENT  COMPONENT ----------
*/
