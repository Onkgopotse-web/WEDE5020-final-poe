/* ==========================================================================
   contact.js — Sweet Heaven's Bakery
   Loaded only on contact.html

   Covers these rubric items:
   - Skill: Form Functionality — Contact Controls
   - Skill: Form Functionality — Contact Validation
   - Skill: Form Functionality — Contact Process Email
     (connected to EmailJS — sends a real email when the form is submitted)

   References used while building this:
   - MDN Web Docs, Constraint Validation:
     https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
   - MDN Web Docs, FormData:
     https://developer.mozilla.org/en-US/docs/Web/API/FormData
   - W3Schools, JavaScript Form Validation:
     https://www.w3schools.com/js/js_validation.asp
   - W3Schools, JS RegExp:
     https://www.w3schools.com/js/js_regexp.asp
   - EmailJS Documentation, Send a form:
     https://www.emailjs.com/docs/sdk/send/
   ========================================================================== */

/* EmailJS account keys (from emailjs.com dashboard)
   Public Key  -> Account > General
   Service ID  -> Email Services
   Template ID -> Email Templates */
var EMAILJS_PUBLIC_KEY  = 'TxYW2dmh2fFCAnwLo';
var EMAILJS_SERVICE_ID  = 'service_u41xl5p';
var EMAILJS_TEMPLATE_ID = 'template_5ctkjfg';

// Initialise EmailJS once, as soon as this script loads
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

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

    /* ----------------------------------------------------------------
       REAL EMAIL PROCESSING — EmailJS
       Sends the actual form fields to your connected email service.
       emailjs.sendForm reads input names directly from the <form>,
       so field "name" attributes must match your EmailJS template
       variables (e.g. {{name}}, {{email}}, {{phone}}, {{message}}).
       ---------------------------------------------------------------- */

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(function () {
        if (responseBox) {
          responseBox.textContent =
            'Thank you, ' + nameField.value.trim() + '! Your message has been sent. ' +
            'We will get back to you at ' + emailField.value.trim() + ' within 1-2 business days.';
          responseBox.className = 'response-box response-box--success';
          responseBox.hidden = false;
        }
        form.reset();
      })
      .catch(function (error) {
        console.error('EmailJS error:', error);
        if (responseBox) {
          responseBox.textContent =
            'Sorry, something went wrong sending your message. Please try again, ' +
            'or contact us directly by phone or email.';
          responseBox.className = 'response-box response-box--error';
          responseBox.hidden = false;
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      });
  });

}); 