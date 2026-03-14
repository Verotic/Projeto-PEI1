// Form Validation Script for Contact Form

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const assunto = document.getElementById('assunto');
  const mensagem = document.getElementById('mensagem');
  const successMessage = document.getElementById('success-message');

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  // Predefined messages for each subject
  const predefinedMessages = {
    'investigacao-clinica': 'Gostaria de obter informações sobre oportunidades de envolvimento em investigação clínica. Por favor, forneça detalhes sobre os projetos em curso, requisitos para participação e próximas datas de início.',
    'formacao-saude': 'Tenho interesse em programas de formação em saúde oferecidos pelo CACA. Gostaria de conhecer os cursos disponíveis, durações, horários e procedimentos de inscrição.',
    'suporte-investigadores': 'Preciso de suporte como investigador. Gostaria de saber mais sobre os recursos disponíveis, mentoria, financiamento e outros apoios que o CACA oferece aos investigadores.',
    'plataformas-digitais': 'Tenho dúvidas sobre as plataformas digitais e sistemas de informação do CACA. Por favor, forneça informações sobre acesso, funcionalidades e suporte técnico.',
    'parcerias': 'Estou interessado em estabelecer parcerias e colaborações com o CACA. Gostaria de discutir oportunidades de cooperação e como podemos trabalhar em conjunto.',
    'informacoes-gerais': 'Tenho perguntas gerais sobre o CACA. Gostaria de obter mais informações sobre a organização, missão, localização e como entrar em contacto.',
    'outro': 'Por favor, descreva o seu assunto ou dúvida em detalhe.'
  };

  /**
   * Clear all error messages for a field
   * @param {HTMLElement} field - The input or text area element
   * @param {string} fieldId - The field identifier (ex 'nome')
   */
  function clearError(field, fieldId) {
    const formGroup = field.parentElement;
    
    // Hide all error messages for this field
    const errorMessages = formGroup.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    formGroup.classList.remove('has-error');
  }

  /**
   * Show specific error message for a field
   * @param {HTMLElement} field - The input or text area element
   * @param {string} fieldId - The field identifier (ex 'nome')
   * @param {string} errorType - The error type (ex 'required', 'format', 'length')
   */
  function showError(field, fieldId, errorType) {
    const formGroup = field.parentElement;
    
    // Hide all error messages for this field first
    const errorMessages = formGroup.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.style.display = 'none');
    
    // Show the specific error message
    let errorElement = document.getElementById(`error-${fieldId}`);
    if (errorType === 'length') {
      errorElement = document.getElementById(`error-${fieldId}-length`);
    } else if (errorType === 'format') {
      errorElement = document.getElementById(`error-${fieldId}-format`);
    }
    
    if (errorElement) {
      errorElement.style.display = 'block';
    }
    
    formGroup.classList.add('has-error');
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
      showError(field, fieldId, 'required');
      return false;
    }

    // Email-specific validation
    if (fieldId === 'email') {
      if (!emailPattern.test(value)) {
        showError(field, fieldId, 'format');
        return false;
      }
    }

    // Name validation (at least 3 characters)
    if (fieldId === 'nome') {
      if (value.length < 3) {
        showError(field, fieldId, 'length');
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

  assunto.addEventListener('change', function() {
    validateField(this, 'assunto');
    
    // Populate message field with predefined text based on selected subject
    if (this.value && predefinedMessages[this.value]) {
      mensagem.value = predefinedMessages[this.value];
    } else {
      mensagem.value = '';
    }
  });

  assunto.addEventListener('blur', function() {
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
