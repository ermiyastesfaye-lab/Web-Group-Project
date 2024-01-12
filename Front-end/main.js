let agree = document.querySelector(".agree");
let button = document.querySelector(".button");
let nam = document.querySelector("#name-input");
let email = document.querySelector("#email-input");
let password = document.querySelector("#password-input");
let confirm = document.querySelector("#confirmPassword-input");
let nameError = document.querySelector("#nameError");
let emailError = document.querySelector("#emailError");
let passwordError = document.querySelector("#passwordError");
let confirmError = document.querySelector("#confirmError");
let confirmMatch = document.querySelector("#confirmMatch");
let isValid = true;

if (agree) {
    agree.addEventListener("change", function () {
        if (agree.checked) {
            button.style.backgroundColor = "#A6C92A";
            button.removeAttribute("disabled");
        }
        else {
            button.style.backgroundColor = "gray";
            button.setAttribute("disabled", "true");
        }
    });
}

var signUp = document.querySelector("#signUp");
var logIn = document.querySelector("#logIn");
if (signUp) {
    signUp.addEventListener("click", function () {
        validateRegistration();
    });
}

if (logIn) {
    logIn.addEventListener("click", function () {
        validateLogIn();
    });
}

async function validateRegistration() {
    if (nam) {
        if (nam.value.trim() === "") {
            nameError.classList.remove("hidden");
            isValid = false;
        }
        else {
            nameError.classList.add("hidden");
        }
    }
    if (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.classList.remove("hidden");
            isValid = false;
        }
        else {
            emailError.classList.add("hidden");
        }
    }
    if (password) {
        if (password.value.trim() === "") {
            passwordError.classList.remove("hidden");
            isValid = false;
        }
        else {
            passwordError.classList.add("hidden");
        }
    }
    if (confirm) {
        if (confirm.value.trim() === "") {
            confirmError.classList.remove("hidden");
            isValid = false;
        }
        else if (confirm.value.trim() !== password.value.trim()) {
            confirmError.classList.add("hidden");
            confirmMatch.classList.remove("hidden");
            isValid = false;
        }
        else {
            confirmError.classList.add("hidden");
            confirmMatch.classList.add("hidden");
        }
    }
    if (isValid) {
        nam = nam.value;
        email = email.value;
        password = password.value;

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nam, email, password })
            });

            const data = await response.json();
            alert("Successful");
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }
}

async function validateLogIn(){
    if (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.classList.remove("hidden");
            isValid = false;
        }
        else {
            emailError.classList.add("hidden");
        }
    }
    if (password) {
        if (password.value.trim() === "") {
            passwordError.classList.remove("hidden");
            isValid = false;
        }
        else {
            passwordError.classList.add("hidden");
        }
    }
    if (isValid) {
        enteredEmail = email.value;
        enteredPassword = password.value;

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enteredEmail, enteredPassword })
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // Handle the response from the server
                if (data.accessToken) {
                    // Store the JWT in local storage or a secure cookie
                    localStorage.setItem('accessToken', data.accessToken);

                    // Redirect to the authenticated page or perform other actions
                    window.location.href = 'add.html';
                } else {
                    // Display an error message
                    alert('Login failed. Please check your credentials.');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });

        }
        
    }
var mobileMenuToggle = document.getElementById("mobile-menu-toggle");
var mobileNavigation = document.querySelector("#mobile-nav");

if (mobileMenuToggle && mobileNavigation) {
    
    mobileMenuToggle.addEventListener("click", function () {
  
        mobileNavigation.classList.toggle("hidden");
    });
}


//Fetching API
