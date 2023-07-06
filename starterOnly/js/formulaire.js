/*
---------- FORM COMPONENT ----------
*/

// Elements du DOM et variables
const formEl = document.getElementById("form");
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

// Variable pour définir un age limite par rapport a une date, ici je choisis 14 ans donc 2007
// Je ne récupère que la date au format AAAA-MM-DD
const ageLimite = new Date("2010-01-01").toISOString().slice(0, 10);
console.log(ageLimite);

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

// création d'une variable pour les messages d'erreur, en cas de modifications il suffira de le faire ici.
const erroMessagesList = {
  fullName: "Ce champ ne peut être vide et doit contenir 2 caractères minimum.",
  email: "Veuillez entrer une adresse email valide.",
  birthdayDate: "Veuillez entrer une date valide, antérieure a 2010",
  nbTournoi: "Veuillez renseigner un chiffre uniquement",
  cityChoice: "Veuillez choisir une option (ville) au minimum",
  privacyPolicy: "veuillez accepter les conditions d'utilisation",
};

/**
 *
 * @param parentNode Element sur lequel on applique le setAttribute
 * @param message message qui sera diffusé sur le formulaire
 * @param check permet de savoir si l'attribut correspond a une erreur ou à un champ valide afin d'afficher ou d'enlever le message.
 */
function displayErrorMessages(parentNode, message, check) {
  if (check === "error") {
    parentNode.parentElement.setAttribute("data-error", message);
    parentNode.parentElement.setAttribute("data-error-visible", true);
  } else {
    parentNode.parentElement.setAttribute("data-error-visible", false);
  }
}

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
    displayErrorMessages(inputValue, erroMessagesList.fullName, "error");
  } else {
    // Sinon, on enlève l'attribut "data-error-visible"
    displayErrorMessages(inputValue, "", "valid");
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
        displayErrorMessages(firstNameEl, erroMessagesList.fullName, "error");
      } else {
        displayErrorMessages(firstNameEl, "", "valid");
        showValidIndicator(firstNameEl);
      }
      break;
    case "last":
      if (inputContent.length < 2 || !fullNameRegex.test(inputContent)) {
        displayErrorMessages(lastNameEl, erroMessagesList.fullName, "error");
      } else {
        displayErrorMessages(lastNameEl, "", "valid");
        showValidIndicator(lastNameEl);
      }
      break;
    case "email":
      if (inputContent.trim() === "" || !emailRegex.test(emailEl.value)) {
        displayErrorMessages(emailEl, erroMessagesList.email, "error");
      } else {
        displayErrorMessages(emailEl, "", "valid");
        showValidIndicator(emailEl);
      }
      break;
  }
}

// ici on boucle sur les trois inputs nom, prénom et email afin de faire les validations dans la fonction au dessus.
inputs.forEach((input) => {
  input.addEventListener("keyup", inputsTextLiveValidation);
});

/**
 * Fonction pour valider le mail
 *
 * @returns {boolean}
 */
function emailValidation() {
  if (emailEl.value.trim() === "" || !emailRegex.test(emailEl.value)) {
    displayErrorMessages(emailEl, erroMessagesList.email, "error");
  } else {
    displayErrorMessages(emailEl, "", "valid");
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
    birthdateEl.value > new Date().toISOString().slice(0, 10) ||
    birthdateEl.value > ageLimite
  ) {
    displayErrorMessages(birthdateEl, erroMessagesList.birthdayDate, "error");
  } else {
    displayErrorMessages(birthdateEl, "", "valid");
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
    displayErrorMessages(quantityEl, erroMessagesList.nbTournoi, "error");
  } else {
    displayErrorMessages(quantityEl, "", "valid");
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
    displayErrorMessages(quantityEl, erroMessagesList.nbTournoi, "error");
  } else {
    displayErrorMessages(quantityEl, "", "valid");
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
    displayErrorMessages(
      cityValidationEl,
      erroMessagesList.cityChoice,
      "error"
    );
  } else {
    displayErrorMessages(
      cityValidationEl,
      erroMessagesList.cityChoice,
      "valid"
    );
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
    displayErrorMessages(checkboxEl, erroMessagesList.privacyPolicy, "error");
    return false;
  }
  displayErrorMessages(checkboxEl, erroMessagesList.privacyPolicy, "valid");
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
