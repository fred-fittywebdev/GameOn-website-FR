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
const modalCloseEl = document.querySelector(".close");
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

/*
---------- FORM COMPONENT ----------
*/

// Elements du DOM et variables
const firstNameEl = document.querySelector("#first");
const lastNameEl = document.querySelector("#last");
const emailEl = document.querySelector("#email");
const birthdateEl = document.querySelector("#birthdate");
const quantityEl = document.querySelector("#quantity");
const cityValidationEl = document.querySelector('input[name="location"]');
const btnRadiosEl = document.querySelectorAll('input[name="location"]');
const checkboxEl = document.getElementById("checkbox1");
const messageRemerciement = document.getElementById("modalRemerciement");
const btnMerci = document.getElementById("btn-merci");

// Variables pour les expressions régulières.
const firstNameRegex = /^[A-Za-zÀ-ÿ -]+$/;
// On accepte les chiffre, le point, le tiret et l'undersocre a gauche de @ on accepte la même chose après, puis après le point uniquement des lettres, 2 ou 4 max contexte global et inseensible a la casse.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// On crée plusieurs groupe pour autoriser les différents chiffres possible dans une date, les slash, et on contrôle que la date ne dépasse pas 4 chiffres.
const birthdateRegex =
  /^(19\d{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
const quantityRegex = /^[0-9]/;

// Récupération du formulaire pour gérer la soumission et lancer la focntion validate() onSubmit
const formEl = document.getElementById("form");
formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  validate();
});

// fonction pour valider le prénom
function firstNameValidation() {
  if (
    firstNameEl.value.trim() === "" ||
    !firstNameRegex.test(firstNameEl.value)
  ) {
    // On ajoute l'attribut true "data-error-visible" à la div parent + le contenu de data-error
    firstNameEl.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
    firstNameEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    // Sinon, on enlève l'attribut "data-error-visible"
    firstNameEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// Fonction pour valider le nom de famille
function lastNameValidation() {
  if (
    lastNameEl.value.trim() === "" ||
    !firstNameRegex.test(firstNameEl.value)
  ) {
    // On ajoute l'attribut true "data-error-visible" à la div parent + le contenu de data-error
    lastNameEl.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom"
    );
    lastNameEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    // Sinon, on enlève l'attribut "data-error-visible"
    lastNameEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// Fonction pour valider le mail
function emailValidation() {
  if (emailEl.value.trim() === "" || !emailRegex.test(emailEl.value)) {
    emailEl.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner votre email"
    );
    emailEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    emailEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// fonction pour vérifier que la date soir présente et valide.
function birthdateValidation() {
  if (
    birthdateEl.value.trim() === "" ||
    !birthdateRegex.test(birthdateEl.value)
  ) {
    birthdateEl.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner votre date de naissance"
    );
    birthdateEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    birthdateEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// fonction pour vérifier qu'un nombre soir rentré au niveau du nombre de tournoi.
function quantityValidation() {
  if (quantityEl.value.trim() === "" || !quantityRegex.test(quantityEl.value)) {
    quantityEl.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner une quantité"
    );
    quantityEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    quantityEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

//Fonction pour valider les boutons radio et vérifier qu'au moins une ville à éré selectionnée.
function cityValidation() {
  let btnRadioChecked = false;

  for (let i = 0; i < btnRadiosEl.length; i++) {
    if (btnRadiosEl[i].checked) {
      btnRadioChecked = true;
      break;
    }
  }

  if (!btnRadioChecked) {
    cityValidationEl.parentElement.setAttribute(
      "data-error",
      "Veuillez choisir une option"
    );
    cityValidationEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    cityValidationEl.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// Fonction pour être sur que la case à cocher des conditions d'utilisation est checked
function checkboxValidation() {
  if (!checkboxEl.checked) {
    checkboxEl.parentElement.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions"
    );
    checkboxEl.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
  checkboxEl.parentElement.setAttribute("data-error-visible", false);
  return true;
}

// Fonction pour faire apparaître la modale de confirmation
function modalRemerciement() {
  //Masquer le formulaire d'origine
  formEl.className = "notActive";

  //Afficher le message et le bouton de fermeture
  messageRemerciement.className = "active";

  //Masque le bouton pour fermer la fenêtre car si utilisateur clique dessus, pas de submit()
  modalCloseEl.className = "notActive";
}

btnMerci.addEventListener("click", function event() {
  //Réactiver le formulaire d'origine --> pas besoin puisque lors du lancement de la modale, display : block
  // form.className = 'Active';
  //Masquer le message
  messageRemerciement.className = "notActive";
  // forcer la fermeture de la modale
  closeModal();
  formEl.submit();
});

// Fonction validate lancée lors de la soumission du formulaire.
function validate() {
  //e.preventDefault();

  firstNameValidation();
  lastNameValidation();
  emailValidation();
  birthdateValidation();
  quantityValidation();
  cityValidation();
  checkboxValidation();

  if (
    firstNameValidation() &&
    lastNameValidation() &&
    emailValidation() &&
    birthdateValidation() &&
    quantityValidation() &&
    cityValidation() &&
    checkboxValidation()
  ) {
    console.log("submit");
    modalRemerciement();
    return true;
  } else {
    return false;
  }
}

/*
---------- END FORM  COMPONENT ----------
*/
