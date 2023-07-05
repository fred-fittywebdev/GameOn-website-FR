// Fonction permettant l'ajout de la classe 'responsive' pour gérer le menu en version mobile.
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// variables globales -> formulaires
const formEl = document.getElementById("form");

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

/*
---------- FORM COMPONENT ----------
*/

// Elements du DOM et variables
const firstNameEl = document.querySelector("#first");
const lastNameEl = document.querySelector("#last");
const inputs = document.querySelectorAll(".inputs");
const emailEl = document.querySelector("#email");
const birthdateEl = document.querySelector("#birthdate");
const quantityEl = document.querySelector("#quantity");
const cityValidationEl = document.querySelector('input[name="location"]');
const btnRadiosEl = document.querySelectorAll('input[name="location"]');
const checkboxEl = document.getElementById("checkbox1");
const messageRemerciement = document.getElementById("modalRemerciement");
const btnMerci = document.getElementById("btn-merci");

// Variables pour les expressions régulières.
const fullNameRegex = /^[A-Za-zÀ-ÿ -]+$/;
// On autorise toutes les lettres, nombres, point, tirets et underscore avant le @, puis toutes les lettres, nombres et tirets avant le . toutes les lettres, idem pour l'extension optionnelle.
// regex universelle /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const emailRegex = /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;
// On crée plusieurs groupe pour autoriser les différents chiffres possible dans une date, les slash, et on contrôle que la date ne dépasse pas 4 chiffres.
// /^(?:(?:19|20)\d{2}[-](?:0?[1-9]|1[012])[-](?:0[1-9]|[12]\d|3[01])|(?:0?[1-9]|[12]\d|3[01])/(?:0?[1-9]|1[012])/(?:19|20)\d{2})$/
const birthdateRegex =
  /^(19\d{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
const quantityRegex = /^[0-9]$/;

// Récupération du formulaire pour gérer la soumission et lancer la focntion validate() onSubmit

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  validate();
});

/**
 * Permet d'afficher un indicateur visuel vert pendant 2 secondes lorsque les consignes de validations sont respectées
 *
 * @param inputCheck correspond a l'inpuit sur lequel on veut afficher cet indicateur.
 */
function showValidIndicator(inputCheck) {
  // show valid indicator
  inputCheck.classList.add("form-valid");

  // remove visual indicator
  setTimeout(() => {
    inputCheck.classList.remove("form-valid");
  }, 2000);
}

/**
 * fonction pour valider le prénom et le nom de l'utilisateur
 *
 * @param inputValue permet d'utiliser le prénom et le nom avec la même focntion
 * @param infos {string} on passe soit "prenom" soit "nom" pour adapter le message d'erreur.
 * @returns {boolean}
 */
function fullNameValidation(inputValue, infos) {
  if (inputValue.value.trim() === "" || !fullNameRegex.test(inputValue.value)) {
    // On ajoute l'attribut true "data-error-visible" à la div parent + le contenu de data-error
    inputValue.parentElement.setAttribute(
      "data-error",
      `Veuillez entrer 2 caractères ou plus pour le champ du ${infos}`
    );
    inputValue.parentElement.setAttribute("data-error-visible", true);
  } else {
    // Sinon, on enlève l'attribut "data-error-visible"
    inputValue.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

/**
 * Ici on récupère l'attribut name de l'input dans lequel on entre des données.
 * On utilise un switch pour detecter et implémenter l'affichage des erreurs en live.
 * Cette validation ne se fait que lorsqu'on tape quelque chose dans un des deux inputs.
 *
 * @param e permet de récuperer l'attribut name des deux inputs.
 */
function inputsTextLiveValidation(e) {
  let inputContent = e.target.value;

  switch (e.target.name) {
    case "first":
      if (inputContent.length < 2 || !fullNameRegex.test(inputContent)) {
        firstNameEl.parentElement.setAttribute(
          "data-error",
          `Veuillez entrer 2 caractères ou plus pour le champ du prenom`
        );
        firstNameEl.parentElement.setAttribute("data-error-visible", true);
      } else {
        firstNameEl.parentElement.setAttribute("data-error-visible", false);
        showValidIndicator(firstNameEl);
      }
      break;
    case "last":
      if (inputContent.length < 2 || !fullNameRegex.test(inputContent)) {
        lastNameEl.parentElement.setAttribute(
          "data-error",
          `Veuillez entrer 2 caractères ou plus pour le champ du nom`
        );
        lastNameEl.parentElement.setAttribute("data-error-visible", true);
      } else {
        lastNameEl.parentElement.setAttribute("data-error-visible", false);
        showValidIndicator(lastNameEl);
      }
      break;
    case "email":
      if (inputContent.trim() === "" || !emailRegex.test(emailEl.value)) {
        emailEl.parentElement.setAttribute(
          "data-error",
          "Veuillez renseigner votre email"
        );
        emailEl.parentElement.setAttribute("data-error-visible", true);
      } else {
        emailEl.parentElement.setAttribute("data-error-visible", false);
        showValidIndicator(emailEl);
      }
      break;
  }
}

// ici on boucle sur les trois inputs nom, prénom et email afin de faire les validations dans la fonction au dessus.
inputs.forEach((input) => {
  input.addEventListener("input", inputsTextLiveValidation);
});

/**
 * Fonction pour valider le mail
 *
 * @returns {boolean}
 */
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

/**
 * fonction pour vérifier que la date soit présente, valide et pas dans le futur.
 *
 * @returns {boolean}
 */
function birthdateValidation() {
  if (
    birthdateEl.value.trim() === "" ||
    !birthdateRegex.test(birthdateEl.value) ||
    birthdateEl.value > new Date().toISOString().slice(0, 10)
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

/**
 * fonction pour vérifier qu'un nombre soir rentré au niveau du nombre de tournoi.
 *
 * @returns {boolean}
 */
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

// Empêcher la possibilité de taper les caractères suivants dans l'input: -, +, e, .

// Je crée un tableau avec les valeurs que je veux interdire
let invalidChars = ["-", "+", "e", "."];

/**
 * Fonction qui determine si la touche enfoncée correspond aux caractères inclus dans la variable invlaidChars
 * Si c'est le cas on annule l'évenement par défaut qui est l'affichage du caractère correspondant a la clé
 *
 * @param e permet de détecter la touche qui est enfoncée, et anisi de récupérer la valeur de key
 */
function onlyNumber(e) {
  if (invalidChars.includes(e.key) || !quantityRegex.test(e.key)) {
    e.preventDefault();
    quantityEl.parentElement.setAttribute(
      "data-error",
      "Veuillez renseigner une quantité"
    );
    quantityEl.parentElement.setAttribute("data-error-visible", true);
  } else {
    quantityEl.parentElement.setAttribute("data-error-visible", false);
    showValidIndicator(quantityEl);
  }
}

quantityEl.addEventListener("keydown", onlyNumber);

// TODO: vérifier les selecteurs.
/**
 * Fonction pour valider les boutons radio et vérifier qu'au moins une ville à éré selectionnée.
 *
 * @returns {boolean}
 */
function cityValidation() {
  // console.log(document.querySelector('input[name="location"]:checked'));
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

cityValidationEl.addEventListener("change", function (e) {});

/**
 * Fonction pour être sur que la case à cocher des conditions d'utilisation est checked
 *
 * @returns {boolean}
 */
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

/**
 * Fonction pour faire apparaître la modale de confirmation
 */
function modalRemerciement() {
  //Masquer le formulaire d'origine
  formEl.className = "inactive";

  //Afficher le message et le bouton de fermeture
  messageRemerciement.className = "active";

  //Masque le bouton pour fermer la fenêtre car si utilisateur clique dessus, pas de submit()
  modalCloseEl.className = "inactive";
}

btnMerci.addEventListener("click", function event() {
  //Réactiver le formulaire d'origine --> pas besoin puisque lors du lancement de la modale, display : block
  // form.className = 'Active';
  //Masquer le message
  messageRemerciement.className = "inactive";
  // forcer la fermeture de la modale
  closeModal();
  formEl.submit();
});

/**
 * Fonction validate lancée lors de la soumission du formulaire.
 *
 * @returns {boolean}
 */
function validate() {
  //e.preventDefault();

  fullNameValidation(firstNameEl, "prénom");
  fullNameValidation(lastNameEl, "nom");
  emailValidation();
  birthdateValidation();
  quantityValidation();
  cityValidation();
  checkboxValidation();

  if (
    fullNameValidation(firstNameEl, "prénom") &&
    fullNameValidation(lastNameEl, "nom") &&
    emailValidation() &&
    birthdateValidation() &&
    quantityValidation() &&
    cityValidation() &&
    checkboxValidation()
  ) {
    modalRemerciement();
    return true;
  } else {
    return false;
  }
}

/*
---------- END FORM  COMPONENT ----------
*/
