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