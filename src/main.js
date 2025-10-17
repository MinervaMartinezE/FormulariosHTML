import './style.css';

//Comprobación de la página en la que está
const isFormPage = !!document.getElementById("fullname");
const isResultPage = !!document.getElementById("userTableBody");


if (isFormPage){
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

  const usersFromStorage = getUserLocal();
  console.log('Users in localStorage:', usersFromStorage);

  renderUsersTable();
})
}
