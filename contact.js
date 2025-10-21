document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form__wrapper");

  // create success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.setAttribute("data-testid", "test-contact-success");
  successMessage.style.display = "none";
  successMessage.textContent =
    "Thank you! Your message has been sent successfully.";

  // Set success message after the form
  form.parentNode.insertBefore(successMessage, form.nextSibling);

  // form elements
  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector(
    '[data-testid="test-contact-email"]'
  );
  const subjectInput = document.querySelector(
    '[data-testid="test-contact-subject"]'
  );
  const messageInput = document.querySelector(
    '[data-testid="test-contact-message"]'
  );
  const submitButton = document.querySelector(
    '[data-testid="test-contact-submit"]'
  );

  // error elements
  const nameError = document.querySelector(
    '[data-testid="test-contact-error-name"]'
  );
  const emailError = document.querySelector(
    '[data-testid="test-contact-error-email"]'
  );
  const subjectError = document.querySelector(
    '[data-testid="test-contact-error-subject"]'
  );
  const messageError = document.querySelector(
    '[data-testid="test-contact-error-message"]'
  );

  // aria-describedby attributes
  nameInput.setAttribute("aria-describedby", "name-error");
  emailInput.setAttribute("aria-describedby", "email-error");
  subjectInput.setAttribute("aria-describedby", "subject-error");
  messageInput.setAttribute("aria-describedby", "message-error");

  // id attributes for error messages
  nameError.id = "name-error";
  emailError.id = "email-error";
  subjectError.id = "subject-error";
  messageError.id = "message-error";

  // hide all error messages initially
  nameError.style.display = "none";
  emailError.style.display = "none";
  subjectError.style.display = "none";
  messageError.style.display = "none";

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      showError(nameError, "Full name is required");
      return false;
    } else {
      hideError(nameError);
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") {
      showError(emailError, "Email is required");
      return false;
    } else if (!emailRegex.test(value)) {
      showError(emailError, "Please enter a valid email address");
      return false;
    } else {
      hideError(emailError);
      return true;
    }
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (value === "") {
      showError(subjectError, "Subject is required");
      return false;
    } else {
      hideError(subjectError);
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === "") {
      showError(messageError, "Message is required");
      return false;
    } else if (value.length < 10) {
      showError(messageError, "Message must be at least 10 characters long");
      return false;
    } else {
      hideError(messageError);
      return true;
    }
  }

  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    errorElement.setAttribute("role", "alert");
  }

  function hideError(errorElement) {
    errorElement.style.display = "none";
    errorElement.removeAttribute("role");
  }

  function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
  }

  // Real-time validation
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  messageInput.addEventListener("blur", validateMessage);

  // Clear errors on input
  nameInput.addEventListener("input", () => hideError(nameError));
  emailInput.addEventListener("input", () => hideError(emailError));
  subjectInput.addEventListener("input", () => hideError(subjectError));
  messageInput.addEventListener("input", () => hideError(messageError));

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      // Show success message
      successMessage.style.display = "block";
      successMessage.setAttribute("role", "status");
      successMessage.setAttribute("aria-live", "polite");

      // Reset form
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    } else {
      // Focus on first invalid field
      const firstInvalidField =
        form.querySelector("[aria-describedby]:invalid") ||
        form.querySelector("input:invalid") ||
        form.querySelector("textarea:invalid") ||
        document.querySelector(
          '[data-testid^="test-contact-error-"]:not([style*="display: none"])'
        );

      if (firstInvalidField) {
        const correspondingInput = form.querySelector(
          `[aria-describedby="${firstInvalidField.id}"]`
        );
        if (correspondingInput) {
          correspondingInput.focus();
        }
      }
    }
  });

  // Keyboard accessibility
  form.addEventListener("keydown", function (e) {
    if (
      e.key === "Enter" &&
      e.target.tagName !== "BUTTON" &&
      e.target.type !== "submit"
    ) {
      e.preventDefault();
      const formElements = Array.from(form.elements);
      const currentIndex = formElements.indexOf(e.target);
      const nextElement = formElements[currentIndex + 1];

      if (nextElement) {
        nextElement.focus();
      }
    }
  });
});
