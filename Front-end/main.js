var agree = document.querySelector(".agree");
var button = document.querySelector(".button");
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
var send = document.querySelector("#signUp");
if (send) {
    send.addEventListener("click", function () {
        validateAndSubmitForm();
    });
}
function validateAndSubmitForm() {
    var nam = document.querySelector("#name-input");
    var email = document.querySelector("#email-input");
    var password = document.querySelector("#password-input");
    var confirm = document.querySelector("#confirmPassword-input");
    var nameError = document.querySelector("#nameError");
    var emailError = document.querySelector("#emailError");
    var passwordError = document.querySelector("#passwordError");
    var confirmError = document.querySelector("#confirmError");
    var confirmMatch = document.querySelector("#confirmMatch");
    var isValid = true;
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
        setTimeout(function () {
            alert("message sent successfully");
        }, 50);
    }
}
var mobileMenuToggle = document.getElementById("mobile-menu-toggle");
// Get the mobile navigation
var mobileNavigation = document.querySelector("#mobile-nav");
// Check if elements exist before adding event listener
if (mobileMenuToggle && mobileNavigation) {
    // Add click event listener to the toggle button
    mobileMenuToggle.addEventListener("click", function () {
        // Toggle the 'hidden' class on the mobile navigation
        mobileNavigation.classList.toggle("hidden");
    });
}
