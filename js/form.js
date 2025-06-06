// Contact form functionality
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show sending indicator
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Send form using Fetch API
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Show success message
      formStatus.innerHTML = 'Thanks for your message! We\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    })
    .catch(error => {
      // Show error message
      formStatus.innerHTML = 'Oops! There was a problem sending your message. Please try again or email us directly.';
      formStatus.className = 'form-status error';
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      console.error('Error:', error);
    });
  });
}
