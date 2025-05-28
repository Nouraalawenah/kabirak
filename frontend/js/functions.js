function displayError(inputId, errorMessage) {
    // Find the input field by ID
    const inputField = document.getElementById(inputId);

    // Remove any existing error message
    const existingError = inputField.nextElementSibling;
    if (existingError && existingError.classList.contains('invalid-feedback')) {
        existingError.remove();
    }

    // Create a new error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback'; // Bootstrap class for error messages
    errorElement.textContent = errorMessage;

    // Append the error message below the input field
    inputField.parentNode.insertBefore(errorElement, inputField.nextSibling);

    // Add invalid class to the input field
    inputField.classList.add('is-invalid');
}

function displayCities() {
    let cities = ["Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq", "Madaba", "Karak", "Tafilah", "Ma'an", "Ajloun", "Jerash", "Al-Salt"];
    let select = document.createElement('select');
    select.className = 'form-select';
    select.id = 'city';

    let defaultOption = document.createElement('option');
    defaultOption.textContent = "Select a city";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    cities.forEach(city => {
        let option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        select.appendChild(option);
    });

    return select;
}