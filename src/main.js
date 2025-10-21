import './style.css';

//Comprobación de la página en la que está
const isFormPage = !!document.getElementById("fullname");
const isResultPage = !!document.getElementById("userTableBody");

if (isFormPage){

//Select Country
const countries = [
  { code: "af", name: "Afghanistan" },
  { code: "al", name: "Albania" },
  { code: "dz", name: "Algeria" },
  { code: "ar", name: "Argentina" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "bd", name: "Bangladesh" },
  { code: "be", name: "Belgium" },
  { code: "br", name: "Brazil" },
  { code: "ca", name: "Canada" },
  { code: "cl", name: "Chile" },
  { code: "cn", name: "China" },
  { code: "co", name: "Colombia" },
  { code: "hr", name: "Croatia" },
  { code: "cz", name: "Czech Republic" },
  { code: "dk", name: "Denmark" },
  { code: "eg", name: "Egypt" },
  { code: "ee", name: "Estonia" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "gr", name: "Greece" },
  { code: "hu", name: "Hungary" },
  { code: "in", name: "India" },
  { code: "id", name: "Indonesia" },
  { code: "ie", name: "Ireland" },
  { code: "il", name: "Israel" },
  { code: "it", name: "Italy" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "mx", name: "Mexico" },
  { code: "ma", name: "Morocco" },
  { code: "nl", name: "Netherlands" },
  { code: "nz", name: "New Zealand" },
  { code: "ng", name: "Nigeria" },
  { code: "no", name: "Norway" },
  { code: "pk", name: "Pakistan" },
  { code: "pe", name: "Peru" },
  { code: "ph", name: "Philippines" },
  { code: "pl", name: "Poland" },
  { code: "pt", name: "Portugal" },
  { code: "ro", name: "Romania" },
  { code: "ru", name: "Russia" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "rs", name: "Serbia" },
  { code: "sg", name: "Singapore" },
  { code: "sk", name: "Slovakia" },
  { code: "si", name: "Slovenia" },
  { code: "za", name: "South Africa" },
  { code: "es", name: "Spain" },
  { code: "se", name: "Sweden" },
  { code: "ch", name: "Switzerland" },
  { code: "th", name: "Thailand" },
  { code: "tr", name: "Turkey" },
  { code: "ua", name: "Ukraine" },
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "ve", name: "Venezuela" },
  { code: "vn", name: "Vietnam" },
];

const customSelect = document.getElementById("custom-select");
const countryList = document.getElementById("countryList");
const selectedOption = customSelect.querySelector(".selected-option");
const hiddenInput = document.getElementById("country");

selectedOption.innerHTML = `<span>Select your country</span>`;
selectedOption.classList.add("placeholder");

countries.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="fi fi-${item.code}"></span> ${item.name}`;
  li.dataset.value = item.code;

  li.addEventListener("click", (event) => {
    event.stopPropagation();

    selectedOption.innerHTML = li.innerHTML;
    selectedOption.classList.remove("placeholder");
    hiddenInput.value = item.code;
    customSelect.classList.remove("open");
    hiddenInput.dispatchEvent(new Event("change"));

  });
  countryList.appendChild(li);
});

customSelect.addEventListener("click", () => {
  customSelect.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("open");
  }
});

// Declaración de variables
const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const countryInput = document.getElementById("country");
const agreeInput = document.getElementById("agree");
const buttonInput = document.getElementById("button");

// Función de validación del formulario
function checkFormValidity() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passInput.value;
  const confirmPassword = confirmInput.value;
  const country = countryInput.value;
  const isAgreed = agreeInput.checked;

  const isEmailValid = emailInput.checkValidity();

  const isFormValid =
    name !== "" &&
    isEmailValid &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword &&
    country !== "" &&
    isAgreed;

confirmInput.addEventListener('blur', () => {
     if (password !== confirmPassword){
    confirmInput.classList.add('invalid');
  } else {
    confirmInput.classList.remove('invalid');
    confirmInput.classList.add('valid');
  }
})

  if (isFormValid) {
  buttonInput.disabled = false; 
} else {
  buttonInput.disabled = true;
}
}

// Eventos que disparan la validación
nameInput.addEventListener('input', checkFormValidity);
emailInput.addEventListener('input', checkFormValidity);
passInput.addEventListener('input', checkFormValidity);
confirmInput.addEventListener('input', checkFormValidity);
countryInput.addEventListener('change', checkFormValidity);
agreeInput.addEventListener('change', checkFormValidity);

// Estado inicial del botón
buttonInput.disabled = true;

//Validar los campos en el momento de introducir los datos
function validateField (input){
    if (input.checkValidity()){
        input.classList.remove("invalid");
        input.classList.add("valid");
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
    }
}
nameInput.addEventListener("blur", () => validateField(nameInput));
emailInput.addEventListener("blur", () => validateField(emailInput));
passInput.addEventListener("blur", () => validateField(passInput));
confirmInput.addEventListener("blur", () => validateField(confirmInput));
countryInput.addEventListener("change", () => validateField(countryInput));

} else if (isResultPage){
//Funciones envio de datos y renderizado de la table result
function getUserData() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('fullname') || '',
        email: params.get('email') || '',
        password: params.get('password') || '',
        country: params.get('country') || '',
    };
}

// Guardar un usuario en localStorage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUserLocal() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function renderUsersTable() {
    const users = getUserLocal();
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.country}</td>
        `;
        tbody.appendChild(row);
    });
}
window.addEventListener('DOMContentLoaded', () => {
  const newUser = getUserData();
  console.log('New user from URL:', newUser);

  saveUser(newUser);

  if (window.history.replaceState) { //Se añade para evitar duplicación de datos en la tabla. 
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, url);
  }

  const usersFromStorage = getUserLocal();
  console.log('Users in localStorage:', usersFromStorage);

  renderUsersTable();
})
}
//Función para borrar usuarios


