document.addEventListener("DOMContentLoaded", function () {
  // Change the selector to match your form's phone number field
  var phoneNumberField = document.querySelector('input[name="phone-1"]');

  // Function to validate phone number length
  function validatePhoneNumber() {
    var phoneNumber = phoneNumberField.value;
    var errorMessage = "Phone number must be at least 6 digits.";
    var minLength = 6;

    // Remove any existing validation message
    var existingError = phoneNumberField.nextElementSibling;
    if (
      existingError &&
      existingError.classList.contains("custom-validation-error")
    ) {
      existingError.remove();
    }

    // Validate phone number length
    if (phoneNumber.length > 0 && phoneNumber.length < minLength) {
      // Create error message element
      var errorElement = document.createElement("div");
      errorElement.classList.add("custom-validation-error");
      errorElement.style.color = "red";
      errorElement.style.fontSize = "12px";
      errorElement.textContent = errorMessage;

      // Insert error message after the phone number field
      phoneNumberField.parentNode.insertBefore(
        errorElement,
        phoneNumberField.nextSibling
      );
    }
  }

  // Validate on input and blur events
  phoneNumberField.addEventListener("input", validatePhoneNumber);
  phoneNumberField.addEventListener("blur", validatePhoneNumber);
});
