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

// ici je déclare une variable qui me permettra de voir si le formulaire a été soumis au moins une fois
// La validation en temps réel ne se fera que lorsque celui ci aura été soumis au moins une fois si nécéssaire.
let formFirstValidation = false;

// Variable pour définir un age limite par rapport a une date, ici je choisis 14 ans donc 2009
// Je ne récupère que la date au format AAAA-MM-DD grâce au slice qui me permet de ne pas prendre en compte l'heure, les minutes et les secondes.
const ageLimite = new Date("2010-01-01").toISOString().slice(0, 10);

// Variables pour les expressions régulières.
// Autorise dans le chmap les caractères uniquement des caractères, ceux-ci peuvent être répétés et le prénom peut contnier un -
const fullNameRegex = /^[A-Za-zÀ-ÿ -]+$/;
// On autorise toutes les lettres, nombres, point, tirets et underscore avant le @, puis toutes les lettres, nombres et tirets avant le . toutes les lettres, idem pour l'extension optionnelle.
// regex universelle /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const emailRegex = /^([a-z\d.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;
// On crée plusieurs groupe pour autoriser les différents chiffres possible dans une date.
const birthdateRegex =
  /^(19\d{2}|2[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
// const quantityRegex = /^[0-9]$/;

// Récupération du formulaire pour gérer la soumission et lancer la fonction validate() onSubmit
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
    parentNode.parentElement.setAttribute("data-error-visible", "true");
  } else {
    parentNode.parentElement.removeAttribute("data-error-visible");
  }
}

/**
 * Permet d'afficher un indicateur visuel vert pendant .5 secondes lorsque les consignes de validations sont respectées
 *
 * @param inputCheck correspond a l'inpuit sur lequel on veut afficher cet indicateur.
 */
function showValidIndicator(inputCheck) {
  // Affiche l'indicateur visuel
  inputCheck.classList.add("form-valid");

  // Enlève l'indicateur visuel au bout de 0.5 secondes
  setTimeout(() => {
    inputCheck.classList.remove("form-valid");
  }, 500);
}

/**
 * fonction pour valider le prénom et le nom de l'utilisateur
 *
 * @param inputValue permet d'utiliser le prénom et le nom avec la même focntion
 * @returns {boolean}
 */
function fullNameValidation(inputValue) {
  if (
    // Si le chmap est soit vide, soit inférieur à 2 caractères, soit non coforme a la regex, on affiche le message d'erreur.
    inputValue.value.trim() === "" ||
    inputValue.value.trim().length < 2 ||
    !fullNameRegex.test(inputValue.value)
  ) {
    displayErrorMessages(inputValue, erroMessagesList.fullName, "error");
  } else {
    // Sinon, on enlève l'attribut "data-error-visible", donc le message d'erreur.
    displayErrorMessages(inputValue, "", "valid");
    showValidIndicator(inputValue);
    return true;
  }
}

/**
 * Ici on récupère l'attribut name de l'input dans lequel on entre des données.
 * On utilise un switch pour detecter ce nom et implémenter l'affichage des erreurs en live.
 * Cette validation ne se fait que lorsqu'on tape quelque chose dans un des inputs.
 *
 * @param e permet de récuperer l'attribut name des deux inputs.
 */
function inputsTextLiveValidation(e) {
  // Si une tentative de soumission du formulaire n'a pas encore été faite la validation en temps réel ne s'exécute pas.
  if (formFirstValidation) {
    switch (e.target.name) {
      case "first":
        fullNameValidation(firstNameEl);
        break;
      case "last":
        fullNameValidation(lastNameEl);
        break;
      case "email":
        emailValidation();
        break;
      case "birthdate":
        birthdateValidation();
        break;
      case "quantity":
        // onlyNumber();
        quantityValidation();
        break;
      case "location":
        cityValidation();
        break;
      case "checkbox1":
        checkboxValidation();
    }
  }
}

// ici on boucle sur les inputs du formulaire afin de mettre en place une validation instantannée grâce a la fonction inputsTextLiveValidation.
inputs.forEach((input) => {
  input.addEventListener("input", inputsTextLiveValidation);
});

/**
 * Fonction pour valider le mail
 *
 * @returns {boolean}
 */
function emailValidation() {
  // Si l'email est vide ou ne correspond pas a l'expression régulière on affiche l'erreur.
  if (emailEl.value.trim() === "" || !emailRegex.test(emailEl.value)) {
    displayErrorMessages(emailEl, erroMessagesList.email, "error");
  } else {
    displayErrorMessages(emailEl, "", "valid");
    showValidIndicator(emailEl);
    return true;
  }
}

/**
 * fonction pour vérifier que la date soit présente, valide, pas dans le futur et que la personne est au moin 14ans.
 *
 * @returns {boolean}
 */
function birthdateValidation() {
  if (
    // Si la date est vide, ne correspond pas a l'expression régulière, est dans le futur ou supérieure a 2009 on affiche une erreur.
    birthdateEl.value.trim() === "" ||
    !birthdateRegex.test(birthdateEl.value) ||
    birthdateEl.value > new Date().toISOString().slice(0, 10) ||
    birthdateEl.value > ageLimite
  ) {
    displayErrorMessages(birthdateEl, erroMessagesList.birthdayDate, "error");
  } else {
    displayErrorMessages(birthdateEl, "", "valid");
    showValidIndicator(birthdateEl);
    return true;
  }
}

/**
 * fonction pour vérifier qu'un nombre soir rentré au niveau du nombre de tournoi.
 *
 * @returns {boolean}
 */
function quantityValidation() {
  console.log(!isNaN(parseInt(quantityEl.value)));
  // Ici je vérifie que la valeur soit différente de NAN (not a number) ce qui me permet de prendre en compte 0
  if (!isNaN(parseInt(quantityEl.value))) {
    displayErrorMessages(quantityEl, "", "valid");
    showValidIndicator(quantityEl);
    return true;
  } else {
    displayErrorMessages(quantityEl, erroMessagesList.nbTournoi, "error");
  }
}

/**
 * Fonction pour valider les boutons radio et vérifier qu'au moins une ville à éré selectionnée.
 *
 * @returns {boolean}
 */
function cityValidation() {
  // On décalre une variable pour déterminer si un bouton radio est coché, faux au départ.
  let btnRadioChecked = false;

  // On boucle sur les différents boutons radio pour voir si l'un d'entre eux est coché.
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
    // Si aucun n'est coché, on affiche le message d'erreur.
    displayErrorMessages(
      cityValidationEl,
      erroMessagesList.cityChoice,
      "valid"
    );
    return true;
  }
}

/**
 * Fonction pour être sur que la case à cocher des conditions d'utilisation est checked
 *
 * @returns {boolean}
 */
function checkboxValidation() {
  // Si aucune cas n'est cochée, on affiche le message d'erreur.
  if (!checkboxEl.checked) {
    displayErrorMessages(checkboxEl, erroMessagesList.privacyPolicy, "error");
    return false;
  }
  displayErrorMessages(checkboxEl, erroMessagesList.privacyPolicy, "valid");
  return true;
}

/**
 * Fonction validate lancée lors de la soumission du formulaire.
 *
 * @returns {boolean}
 */
function validate() {
  // Ici a la soumission je décalre la variable a true pour autoriser la validation en temps réel.
  formFirstValidation = true;

  // J'execute mes différentes focntions de validations
  fullNameValidation(firstNameEl);
  fullNameValidation(lastNameEl);
  emailValidation();
  birthdateValidation();
  quantityValidation();
  cityValidation();
  checkboxValidation();

  if (
    // Si il n'y a pas d'erreur lors de l'execution des ces focntions de validations ( toutes ) on soumet le formulaire.
    fullNameValidation(firstNameEl) &&
    fullNameValidation(lastNameEl) &&
    emailValidation() &&
    birthdateValidation() &&
    quantityValidation() &&
    cityValidation() &&
    checkboxValidation()
  ) {
    // On affiche la modale avec le message de remerciement.
    modalRemerciement();
    return true;
  } else {
    return false;
  }
}
