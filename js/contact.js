/* ==========================================================================
   contact.js — Sweet Heaven's Bakery
   Loaded only on contact.html
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
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameField    = document.getElementById('contact-name');
  const emailField   = document.getElementById('contact-email');
  const phoneField   = document.getElementById('contact-phone');
  const messageField = document.getElementById('contact-message');
  const responseBox  = document.getElementById('contact-response');
  const submitBtn    = form.querySelector('button[type="submit"], input[type="submit"]');

  // Regex patterns
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

  const validateEmail = () => {
    const value = emailField.value.trim();
    if (!value) return setFieldError(emailField, 'Please enter your email address.'), false;
    if (!EMAIL_PATTERN.test(value)) return setFieldError(emailField, 'Please enter a valid email address, e.g. name@example.com.'), false;
    setFieldError(emailField, ''); return true;
  };

  const validatePhone = () => {
    const value = phoneField.value.trim();
    if (value && !PHONE_PATTERN.test(value)) return setFieldError(phoneField, 'Please enter a valid phone number.'), false;
    setFieldError(phoneField, ''); return true;
  };

  const validateMessage = () => {
    const value = messageField.value.trim();
    if (!value) return setFieldError(messageField, 'Please enter a message.'), false;
    if (value.length < 10) return setFieldError(messageField, 'Your message should be at least 10 characters.'), false;
    setFieldError(messageField, ''); return true;
  };

  //Live validation
  nameField.addEventListener('blur', validateName);
  emailField.addEventListener('blur', validateEmail);
  phoneField.addEventListener('blur', validatePhone);
  messageField.addEventListener('blur', validateMessage);

  // Form submission
  form.addEventListener('submit', event => {
    event.preventDefault();

    const isValid =
      validateName() &&
      validateEmail() &&
      validatePhone() &&
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
      submitBtn.textContent = 'Sending...';
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        if (responseBox) {
          responseBox.textContent =
            `Thank you, ${nameField.value.trim()}! Your message has been sent. ` +
            `We will get back to you at ${emailField.value.trim()} within 1-2 business days.`;
          responseBox.className = 'response-box response-box--success';
          responseBox.hidden = false;
        }
        form.reset();
      })
      .catch(error => {
        console.error('EmailJS error:', error);
        if (responseBox) {
          responseBox.textContent =
            'Sorry, something went wrong sending your message. Please try again, ' +
            'or contact us directly by phone or email.';
          responseBox.className = 'response-box response-box--error';
          responseBox.hidden = false;
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      });
  });
});
