/* ==========================================================================
   enquiry.js — Sweet Heaven's Bakery
   Loaded only on enquiry.html
   ========================================================================== */

// EmailJS account keys
const EMAILJS_PUBLIC_KEY  = 'TxYW2dmh2fFCAnwLo';
const EMAILJS_SERVICE_ID  = 'service_u41xl5p';
const EMAILJS_TEMPLATE_ID = 'template_5ctkjfg';

// Initialise EmailJS once
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const nameField    = document.getElementById('enquiry-name');
  const phoneField   = document.getElementById('enquiry-phone');
  const emailField   = document.getElementById('enquiry-email');
  const typeField    = document.getElementById('enquiry-type');
  const messageField = document.getElementById('enquiry-message');
  const responseBox  = document.getElementById('enquiry-response');
  const submitBtn    = form.querySelector('button[type="submit"], input[type="submit"]');

  const NAME_PATTERN  = /^[A-Za-z\s'-]{2,50}$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_PATTERN = /^[0-9+\s-]{7,15}$/;

  // Helper: show/clear error messages
  const setFieldError = (field, message) => {
    const errorEl = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    field.classList.toggle('input-invalid', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  };

  // Validators
  const validateName = () => {
    const value = nameField.value.trim();
    if (!value) return setFieldError(nameField, 'Please enter your full name.'), false;
    if (!NAME_PATTERN.test(value)) return setFieldError(nameField, 'Name should only contain letters and spaces.'), false;
    setFieldError(nameField, ''); return true;
  };

  const validatePhone = () => {
    const value = phoneField.value.trim();
    if (!value) return setFieldError(phoneField, 'Please enter your cellphone number.'), false;
    if (!PHONE_PATTERN.test(value)) return setFieldError(phoneField, 'Please enter a valid cellphone number.'), false;
    setFieldError(phoneField, ''); return true;
  };

  const validateEmail = () => {
    const value = emailField.value.trim();
    if (!value) return setFieldError(emailField, 'Please enter your email address.'), false;
    if (!EMAIL_PATTERN.test(value)) return setFieldError(emailField, 'Please enter a valid email address, e.g. name@example.com.'), false;
    setFieldError(emailField, ''); return true;
  };

  const validateType = () => {
    if (!typeField) return true;
    if (!typeField.value || typeField.value === 'placeholder')
      return setFieldError(typeField, 'Please select an enquiry type.'), false;
    setFieldError(typeField, ''); return true;
  };

  const validateMessage = () => {
    const value = messageField.value.trim();
    if (!value) return setFieldError(messageField, 'Please tell us a bit about your enquiry.'), false;
    if (value.length < 10) return setFieldError(messageField, 'Please write at least 10 characters.'), false;
    setFieldError(messageField, ''); return true;
  };

  //Live validation
  nameField.addEventListener('blur', validateName);
  phoneField.addEventListener('blur', validatePhone);
  emailField.addEventListener('blur', validateEmail);
  if (typeField) typeField.addEventListener('change', validateType);
  messageField.addEventListener('blur', validateMessage);

  // Form submission
  form.addEventListener('submit', event => {
    event.preventDefault();

    const isValid =
      validateName() &&
      validatePhone() &&
      validateEmail() &&
      validateType() &&
      validateMessage();

    if (!isValid) {
      if (responseBox) {
        responseBox.textContent = 'Please fix the highlighted fields before sending.';
        responseBox.className = 'response-box response-box--error';
        responseBox.hidden = false;
      }
      const firstInvalid = form.querySelector('.input-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const enquiryTypeLabel = typeField
      ? typeField.options[typeField.selectedIndex].text
      : 'General Enquiry';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        if (responseBox) {
          responseBox.textContent =
            `Thanks, ${nameField.value.trim()}! Your "${enquiryTypeLabel}" enquiry has been submitted. We will contact you at ${phoneField.value.trim()} or ${emailField.value.trim()} soon.`;
          responseBox.className = 'response-box response-box--success';
          responseBox.hidden = false;
        }
        form.reset();
      })
      .catch(error => {
        console.error('EmailJS error:', error);
        if (responseBox) {
          responseBox.textContent =
            'Sorry, something went wrong submitting your enquiry. Please try again, or contact us directly by phone or email.';
          responseBox.className = 'response-box response-box--error';
          responseBox.hidden = false;
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Enquiry';
        }
      });
  });

  // Interactive map toggle
  const mapToggleBtn = document.getElementById('map-toggle');
  const mapFrame = document.getElementById('bakery-map');

  if (mapToggleBtn && mapFrame) {
    mapToggleBtn.addEventListener('click', () => {
      const isExpanded = mapFrame.classList.toggle('map-frame--expanded');
      mapToggleBtn.textContent = isExpanded ? 'Show smaller map' : 'Show larger map';
      mapToggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }
});
