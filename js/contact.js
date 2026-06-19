/* ==========================================================================
   contact.js — Sweet Heaven's Bakery
   Loaded only on contact.html

   Covers these rubric items:
   - Skill: Form Functionality — Contact Controls
   - Skill: Form Functionality — Contact Validation
   - Skill: Form Functionality — Contact Process Email
     (simulated client-side, as no real email service is connected yet.
     To send real emails later, see the EmailJS notes at the bottom
     of this file.)

   References used while building this:
   - MDN Web Docs, Constraint Validation:
     https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
   - MDN Web Docs, FormData:
     https://developer.mozilla.org/en-US/docs/Web/API/FormData
   - W3Schools, JavaScript Form Validation:
     https://www.w3schools.com/js/js_validation.asp
   - W3Schools, JS RegExp:
     https://www.w3schools.com/js/js_regexp.asp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('contact-form');
  if (!form) {
    return; // contact.js only runs anything if the contact form exists
  }

  var nameField    = document.getElementById('contact-name');
  var emailField   = document.getElementById('contact-email');
  var phoneField   = document.getElementById('contact-phone');
  var messageField = document.getElementById('contact-message');
  var responseBox  = document.getElementById('contact-response');
  var submitBtn    = form.querySelector('button[type="submit"], input[type="submit"]');

  /* Simple regex patterns for validation
     Name    : letters and spaces only, at least 2 characters
     Email   : standard email shape, e.g. name@example.com
     Phone   : digits, spaces, plus sign and dashes, 7-15 characters */
  var NAME_PATTERN  = /^[A-Za-z\s'-]{2,50}$/;
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_PATTERN = /^[0-9+\s-]{7,15}$/;

  /* ------------------------------------------------------------------
     Helper: show an error message under a given field and mark it
     invalid for both screen readers and CSS styling.
     ------------------------------------------------------------------ */
  function setFieldError(field, message) {
    var errorEl = document.getElementById(field.id + '-error');
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    field.classList.toggle('input-invalid', Boolean(message));
    if (errorEl) {
      errorEl.textContent = message || '';
    }
  }

  /* ------------------------------------------------------------------
     Individual field validators. Each returns true if valid.
     ------------------------------------------------------------------ */
  function validateName() {
    var value = nameField.value.trim();
    if (value === '') {
      setFieldError(nameField, 'Please enter your full name.');
      return false;
    }
    if (!NAME_PATTERN.test(value)) {
      setFieldError(nameField, 'Name should only contain letters and spaces.');
      return false;
    }
    setFieldError(nameField, '');
    return true;
  }

  function validateEmail() {
    var value = emailField.value.trim();
    if (value === '') {
      setFieldError(emailField, 'Please enter your email address.');
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setFieldError(emailField, 'Please enter a valid email address, e.g. name@example.com.');
      return false;
    }
    setFieldError(emailField, '');
    return true;
  }

  function validatePhone() {
    // Phone is optional on the contact form, but if filled in, must be valid
    var value = phoneField.value.trim();
    if (value !== '' && !PHONE_PATTERN.test(value)) {
      setFieldError(phoneField, 'Please enter a valid phone number.');
      return false;
    }
    setFieldError(phoneField, '');
    return true;
  }

  function validateMessage() {
    var value = messageField.value.trim();
    if (value === '') {
      setFieldError(messageField, 'Please enter a message.');
      return false;
    }
    if (value.length < 10) {
      setFieldError(messageField, 'Your message should be at least 10 characters.');
      return false;
    }
    setFieldError(messageField, '');
    return true;
  }

  /* ------------------------------------------------------------------
     Live validation — validate each field as the visitor leaves it,
     so they get feedback before they even hit submit.
     ------------------------------------------------------------------ */
  nameField.addEventListener('blur', validateName);
  emailField.addEventListener('blur', validateEmail);
  phoneField.addEventListener('blur', validatePhone);
  messageField.addEventListener('blur', validateMessage);

  /* ------------------------------------------------------------------
     Form submission — validate everything, then simulate sending
     the email and show a clear response message to the user.
     ------------------------------------------------------------------ */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var isNameValid    = validateName();
    var isEmailValid   = validateEmail();
    var isPhoneValid   = validatePhone();
    var isMessageValid = validateMessage();

    var formIsValid = isNameValid && isEmailValid && isPhoneValid && isMessageValid;

    if (!formIsValid) {
      if (responseBox) {
        responseBox.textContent = 'Please fix the highlighted fields before sending.';
        responseBox.className = 'response-box response-box--error';
        responseBox.hidden = false;
      }
      // Move focus to the first invalid field for accessibility
      var firstInvalid = form.querySelector('.input-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }
<<<<<<< Updated upstream

    /* ----------------------------------------------------------------
       SIMULATED EMAIL PROCESSING
       This site is not yet connected to a real email service.
       Below is a simulated send: button shows a "Sending..." state,
       then the form resets and a success message displays.

       TO CONNECT A REAL EMAIL SERVICE LATER (EmailJS example):
       1. Create a free account at https://www.emailjs.com
       2. Get your Service ID, Template ID and Public Key
       3. Add the EmailJS SDK script tag to contact.html:
            <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
       4. Replace the setTimeout() block below with:
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY')
              .then(function () { showSuccess(); })
              .catch(function () { showFailure(); });
       ---------------------------------------------------------------- */

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(function () {
      if (responseBox) {
        responseBox.textContent =
          'Thank you, ' + nameField.value.trim() + '! Your message has been received. ' +
          'We will get back to you at ' + emailField.value.trim() + ' within 1-2 business days.';
        responseBox.className = 'response-box response-box--success';
        responseBox.hidden = false;
      }

      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }, 900); // short delay to simulate network request
  });

});  
=======
    contactResponse.textContent = 'Your email app should open now. If it does not, check your device email settings.';
  }
}
>>>>>>> Stashed changes
