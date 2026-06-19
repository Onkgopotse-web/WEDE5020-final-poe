/* ==========================================================================
   enquiry.js — Sweet Heaven's Bakery
   Loaded only on enquiry.html

   Covers these rubric items:
   - Skill: Form Functionality — Enquiry Controls
   - Skill: Form Functionality — Enquiry Validation
   - Skill: Form Functionality — Enquiry Process Response
     (simulated client-side — see contact.js notes for connecting a
     real email service such as EmailJS later)
   - Skill: Interactive Maps (the map itself is an embedded Google
     Maps iframe in enquiry.html; this file only manages the small
     "view larger map" toggle so it counts as an interactive element
     rather than a static embed)
   - Skill: Gallery Lightbox — shared logic lives in main.js and is
     triggered automatically for any .lightbox-trigger images on
     this page (e.g. a small bakery photo gallery beside the form)

   References used while building this:
   - MDN Web Docs, Constraint Validation:
     https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation
   - W3Schools, JavaScript Form Validation:
     https://www.w3schools.com/js/js_validation.asp
   - W3Schools, JS Select Dropdown:
     https://www.w3schools.com/jsref/dom_obj_select.asp
   - W3Schools, Google Maps Embed:
     https://www.w3schools.com/html/html_google_maps.asp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('enquiry-form');
  if (!form) {
    return; // enquiry.js only runs anything if the enquiry form exists
  }

  var nameField    = document.getElementById('enquiry-name');
  var phoneField   = document.getElementById('enquiry-phone');
  var emailField   = document.getElementById('enquiry-email');
  var typeField    = document.getElementById('enquiry-type');     // <select> dropdown
  var messageField = document.getElementById('enquiry-message');
  var responseBox  = document.getElementById('enquiry-response');
  var submitBtn    = form.querySelector('button[type="submit"], input[type="submit"]');

  var NAME_PATTERN  = /^[A-Za-z\s'-]{2,50}$/;
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_PATTERN = /^[0-9+\s-]{7,15}$/;

  /* ------------------------------------------------------------------
     Helper: show/clear an inline error message under a field
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
     Field validators
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

  function validatePhone() {
    var value = phoneField.value.trim();
    if (value === '') {
      setFieldError(phoneField, 'Please enter your cellphone number.');
      return false;
    }
    if (!PHONE_PATTERN.test(value)) {
      setFieldError(phoneField, 'Please enter a valid cellphone number.');
      return false;
    }
    setFieldError(phoneField, '');
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

  function validateType() {
    // Dropdown for enquiry type, e.g. "Cake Order", "Catering", "General"
    if (!typeField) {
      return true; // field is optional in markup; skip if not present
    }
    if (typeField.value === '' || typeField.value === 'placeholder') {
      setFieldError(typeField, 'Please select an enquiry type.');
      return false;
    }
    setFieldError(typeField, '');
    return true;
  }

  function validateMessage() {
    var value = messageField.value.trim();
    if (value === '') {
      setFieldError(messageField, 'Please tell us a bit about your enquiry.');
      return false;
    }
    if (value.length < 10) {
      setFieldError(messageField, 'Please write at least 10 characters.');
      return false;
    }
    setFieldError(messageField, '');
    return true;
  }

  /* ------------------------------------------------------------------
     Live validation on blur
     ------------------------------------------------------------------ */
  nameField.addEventListener('blur', validateName);
  phoneField.addEventListener('blur', validatePhone);
  emailField.addEventListener('blur', validateEmail);
  if (typeField) {
    typeField.addEventListener('change', validateType);
  }
  messageField.addEventListener('blur', validateMessage);

  /* ------------------------------------------------------------------
     Form submission — validate, simulate processing, show response
     ------------------------------------------------------------------ */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var isNameValid    = validateName();
    var isPhoneValid   = validatePhone();
    var isEmailValid   = validateEmail();
    var isTypeValid    = validateType();
    var isMessageValid = validateMessage();

    var formIsValid = isNameValid && isPhoneValid && isEmailValid &&
                       isTypeValid && isMessageValid;

    if (!formIsValid) {
      if (responseBox) {
        responseBox.textContent = 'Please fix the highlighted fields before sending.';
        responseBox.className = 'response-box response-box--error';
        responseBox.hidden = false;
      }
      var firstInvalid = form.querySelector('.input-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    /* SIMULATED PROCESSING — see contact.js for EmailJS connection notes */
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    setTimeout(function () {
      var enquiryTypeLabel = typeField
        ? typeField.options[typeField.selectedIndex].text
        : 'General Enquiry';

      if (responseBox) {
        responseBox.textContent =
          'Thanks, ' + nameField.value.trim() + '! Your "' + enquiryTypeLabel +
          '" enquiry has been submitted. We will contact you at ' +
          phoneField.value.trim() + ' or ' + emailField.value.trim() + ' soon.';
        responseBox.className = 'response-box response-box--success';
        responseBox.hidden = false;
      }

      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry';
      }
    }, 900);
  });


  /* ------------------------------------------------------------------
     INTERACTIVE MAP TOGGLE
     The map itself is an embedded Google Maps <iframe> in enquiry.html
     (see HTML snippet below). This toggle expands it to a larger view
     so it behaves as an interactive element rather than a static embed.
     ------------------------------------------------------------------ */
  var mapToggleBtn = document.getElementById('map-toggle');
  var mapFrame = document.getElementById('bakery-map');

  if (mapToggleBtn && mapFrame) {
    mapToggleBtn.addEventListener('click', function () {
      var isExpanded = mapFrame.classList.toggle('map-frame--expanded');
      mapToggleBtn.textContent = isExpanded ? 'Show smaller map' : 'Show larger map';
      mapToggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

});   
