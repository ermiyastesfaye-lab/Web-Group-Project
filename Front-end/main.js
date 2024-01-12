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
let currentPage = document.body.getAttribute('data-page');
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
            window.location.href = 'myCrop.html';
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }
}

if (logIn) {
    logIn.addEventListener("click", function () {
        validateLogIn();
    });
}

async function validateLogIn() {
    isValid = true;

    if (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.classList.remove("hidden");
            isValid = false;
        } else {
            emailError.classList.add("hidden");
        }
    }
    if (password) {
        if (password.value.trim() === "") {
            passwordError.classList.remove("hidden");
            isValid = false;
        } else {
            passwordError.classList.add("hidden");
        }
    }

    let enteredEmail, enteredPassword;

    if (isValid) {
        enteredEmail = email.value;
        enteredPassword = password.value;

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: enteredEmail, password:enteredPassword }),
            });

            if (!response.ok) {
                throw new Error('Response not ok');
            }

            const data = await response.json();
            console.log(data)

            if (data) {
                // Store the JWT in local storage or a secure cookie
                localStorage.setItem('accessToken', data);

                window.location.href = 'myCrop.html';
            } else {
                // Display an error message if the server response is unexpected
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Login failed. Please check your credentials.');
        }
    }
}

var mobileMenuToggle = document.getElementById("mobile-menu-toggle");
var mobileNavigation = document.querySelector("#mobile-nav");

if (mobileMenuToggle && mobileNavigation) {
    
    mobileMenuToggle.addEventListener("click", function () {
  
        mobileNavigation.classList.toggle("hidden");
    });
}


async function simulateFormSubmission() {
    const cropName = document.querySelector('#crop-name').value;
    const cropType = document.querySelector('#crop-type').value;
    const plantingDate = document.querySelector('#planting-date').value;
    const harvestingDate = document.querySelector('#harvesting-date').value;
    const plantingField = document.querySelector('#planting-field').value;

    const data = {
        name: cropName,
        cropType: cropType,
        plantingDate: plantingDate,
        harvestingDate: harvestingDate,
        plantingField: plantingField,
    };

    try {
        const response = await fetch('http://localhost:3000/crops', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to add crop');
        }

        const responseData = await response.json();
        window.location.href = 'myCrop.html';
        console.log('Crop added successfully. Crop ID:', responseData.Id);
    } catch (error) {
        console.error('Error adding crop:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    let currentPage = document.body.getAttribute('data-page');

    if (currentPage === 'my-crop') {
        try {
            const response = await fetch('http://localhost:3000/crops', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch crops');
            }
    
            const crops = await response.json();
            displayCrops(crops);
        } catch (error) {
            console.error('Error fetching crops:', error.message);
        }

    } else if (currentPage === 'update') {
        const urlParams = new URLSearchParams(window.location.search);
        const cropId = urlParams.get('id');

        try {
            const response = await fetch(`http://localhost:3000/crops/${cropId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch crop details');
            }

            const cropDetails = await response.json();
            displayCropDetails(cropDetails);

        } catch (error) {
            console.error('Error fetching crop details:', error.message);
        }
    }
});

function displayCrops(crops) {

    console.log(crops);
    const tableBody = document.querySelector('tbody');
    
    crops.forEach(crop => {
        const row = document.createElement('tr');
        
        const cropNameCell = document.createElement('td');
        cropNameCell.textContent = crop.name;
        applyCellStyle(cropNameCell);
        row.appendChild(cropNameCell);
        
        const cropTypeCell = document.createElement('td');
        cropTypeCell.textContent = crop.cropType;
        applyCellStyle(cropTypeCell);
        row.appendChild(cropTypeCell);

        const plantingDateCell = document.createElement('td');
        plantingDateCell.textContent = crop.plantingDate;
        applyCellStyle(plantingDateCell); 
        row.appendChild(plantingDateCell);

        const harvestingDateCell = document.createElement('td');
        harvestingDateCell.textContent = crop.harvestingDate;
        applyCellStyle(harvestingDateCell); 
        row.appendChild(harvestingDateCell);

        const plantingFieldCell = document.createElement('td');
        plantingFieldCell.textContent = crop.plantingField;
        applyCellStyle(plantingFieldCell);
        row.appendChild(plantingFieldCell);
        
        

        const editLinkCell = document.createElement('td');
        const editLink = document.createElement('a');
        editLink.textContent = 'Edit';
        editLink.href = `update.html?id=${crop.id}`; // Assuming 'id' is the identifier for each crop
        editLinkCell.appendChild(editLink);
        applyCellStyle(editLinkCell);
        row.appendChild(editLinkCell);

        tableBody.appendChild(row);

        // Add click event listener for each row to navigate to the edit page
        row.addEventListener('click', () => {
            window.location.href = `update.html?id=${crop.id}`;
        });
    });
}

function applyCellStyle(cell) {
    cell.style.border = '2px solid black'; // Add border
    cell.style.borderColor = 'black'; // Specify border color
    cell.style.padding = '8px'; // Adjust padding as needed
}

function displayCropDetails(cropDetails) {
    const cropNameElement = document.querySelector('#crop-name');
    const cropTypeElement = document.querySelector('#crop-type');
    const plantingDateElement = document.querySelector('#planting-date');
    const harvestingDateElement = document.querySelector('#harvesting-date');
    const plantingFieldElement = document.querySelector('#planting-field');
    const editLink = document.getElementById('editLink');

    cropNameElement.textContent = `${cropDetails.name}`;
    cropTypeElement.textContent = `${cropDetails.cropType}`;
    plantingDateElement.textContent = `${cropDetails.plantingDate}`;
    harvestingDateElement.textContent = `${cropDetails.harvestingDate}`;
    plantingFieldElement.textContent = `${cropDetails.plantingField}`;

    editLink.href = `edit.html?id=${cropDetails.id}`;
}

async function editSubmission() {
    const urlParams = new URLSearchParams(window.location.search);
    const cropId = urlParams.get('id');
    const cropName = document.querySelector('#crop-name').value;
    const cropType = document.querySelector('#crop-type').value;
    const plantingDate = document.querySelector('#planting-date').value;
    const harvestingDate = document.querySelector('#harvesting-date').value;
    const plantingField = document.querySelector('#planting-field').value;

    const data = {
        name: cropName,
        cropType: cropType,
        plantingDate: plantingDate,
        harvestingDate: harvestingDate,
        plantingField: plantingField,
    };

    try {
        const response = await fetch(`http://localhost:3000/crops/${cropId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update crop');
        }

        console.log('Crop updated successfully');
        window.location.href = 'myCrop.html';

    } catch (error) {
        console.error('Error updating crop:', error.message);
    }
}

async function deleteSubmission(){
    const urlParams = new URLSearchParams(window.location.search);
    const cropId = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:3000/crops/${cropId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Crop deleted successfully');
            window.location.href = 'myCrop.html';
        } else {
            console.error('Failed to delete crop');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



