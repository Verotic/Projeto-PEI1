// Form Validation Script for Contact Form

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const assunto = document.getElementById('assunto');
  const mensagem = document.getElementById('mensagem');
  const successMessage = document.getElementById('success-message');

  // Email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Clear error message for a field
   * @param {HTMLElement} field - The input or text area element
   * @param {string} fieldId - The field identifier (ex 'nome')
   */
  function clearError(field, fieldId) {
    const formGroup = field.parentElement;
    const errorElement = document.getElementById(`error-${fieldId}`);
    
    formGroup.classList.remove('has-error');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  /**
   * Show error message for a field
   * @param {HTMLElement} field - The input or text area element
   * @param {string} fieldId - The field identifier (ex 'nome')
   * @param {string} message - The error message to display
   */
  function showError(field, fieldId, message) {
    const formGroup = field.parentElement;
    const errorElement = document.getElementById(`error-${fieldId}`);
    
    formGroup.classList.add('has-error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  /**
   * Validate individual field
   * @param {HTMLElement} field - The input or text area element
   * @param {string} fieldId - The field identifier (ex 'nome')
   * @returns {boolean} - True if field is valid, false otherwise
   */
  function validateField(field, fieldId) {
    const value = field.value.trim();

    // Check if field is empty
    if (value === '') {
      const fieldNames = {
        'nome': 'Nome',
        'email': 'E-mail',
        'assunto': 'Assunto',
        'mensagem': 'Mensagem'
      };
      showError(field, fieldId, `${fieldNames[fieldId]} é obrigatório.`);
      return false;
    }

    // Email-specific validation
    if (fieldId === 'email') {
      if (!emailPattern.test(value)) {
        showError(field, fieldId, 'Por favor, insira um endereço de e-mail válido.');
        return false;
      }
    }

    // Name validation (at least 3 characters)
    if (fieldId === 'nome') {
      if (value.length < 3) {
        showError(field, fieldId, 'Nome deve ter pelo menos 3 caracteres.');
        return false;
      }
    }

    // Clear error if validation passes
    clearError(field, fieldId);
    return true;
  }

  /**
   * Validate entire form
   * @returns {boolean} - True if all fields are valid, false otherwise
   */
  function validateForm() {
    const isNomeValid = validateField(nome, 'nome');
    const isEmailValid = validateField(email, 'email');
    const isAssuntoValid = validateField(assunto, 'assunto');
    const isMensagemValid = validateField(mensagem, 'mensagem');

    return isNomeValid && isEmailValid && isAssuntoValid && isMensagemValid;
  }

  /**
   * Show success message
   */
  function showSuccessMessage() {
    successMessage.style.display = 'flex';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide success message after 5 seconds
    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 5000);
  }

  /**
   * Reset form and clear all errors
   */
  function resetForm() {
    form.reset();
    
    // Clear all error messages
    [nome, email, assunto, mensagem].forEach(field => {
      const fieldId = field.id;
      clearError(field, fieldId);
    });
  }

  // Real-time validation on input
  nome.addEventListener('blur', function() {
    validateField(this, 'nome');
  });

  nome.addEventListener('input', function() {
    if (this.parentElement.classList.contains('has-error')) {
      validateField(this, 'nome');
    }
  });

  email.addEventListener('blur', function() {
    validateField(this, 'email');
  });

  email.addEventListener('input', function() {
    if (this.parentElement.classList.contains('has-error')) {
      validateField(this, 'email');
    }
  });

  assunto.addEventListener('blur', function() {
    validateField(this, 'assunto');
  });

  assunto.addEventListener('input', function() {
    if (this.parentElement.classList.contains('has-error')) {
      validateField(this, 'assunto');
    }
  });

  mensagem.addEventListener('blur', function() {
    validateField(this, 'mensagem');
  });

  mensagem.addEventListener('input', function() {
    if (this.parentElement.classList.contains('has-error')) {
      validateField(this, 'mensagem');
    }
  });

  // Form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate all fields
    if (validateForm()) {
      // Display success message
      showSuccessMessage();
      
      // Reset form
      resetForm();
      
      // Log the form data (simulating successful submission)
      console.log('Form submitted successfully with data:', {
        nome: nome.value.trim(),
        email: email.value.trim(),
        assunto: assunto.value.trim(),
        mensagem: mensagem.value.trim()
      });
    }
  });
});
