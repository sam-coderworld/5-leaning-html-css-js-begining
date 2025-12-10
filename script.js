// ========== JAVASCRIPT CODE ==========

// Get the form element
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    // Prevent the form from actually submitting (page refresh)
    event.preventDefault();
    
    // Validate the form
    if (validateForm()) {
        // Get all form values
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            priority: document.querySelector('input[name="priority"]:checked').value,
            message: document.getElementById('message').value
        };

        // Get selected contact preferences
        const contactPrefs = [];
        document.querySelectorAll('input[name="contactPref"]:checked').forEach(function(checkbox) {
            contactPrefs.push(checkbox.value);
        });
        formData.contactPreferences = contactPrefs;

        // Log the form data to console (for learning purposes)
        console.log('Form Data:', formData);

        // Show success message
        successMessage.style.display = 'block';

        // Reset the form
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);

        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Function to validate the form
function validateForm() {
    let isValid = true;

    // Get form elements
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Reset all error messages
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    subjectError.style.display = 'none';
    messageError.style.display = 'none';

    // Validate name
    if (fullName.value.trim() === '') {
        nameError.style.display = 'block';
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === '') {
        emailError.style.display = 'block';
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        isValid = false;
    }

    // Validate subject
    if (subject.value === '') {
        subjectError.style.display = 'block';
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === '') {
        messageError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}

// Function to check if email is valid
function isValidEmail(email) {
    // Simple email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Add real-time validation on input fields
document.getElementById('fullName').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        document.getElementById('nameError').style.display = 'none';
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim() !== '' && isValidEmail(this.value)) {
        document.getElementById('emailError').style.display = 'none';
    }
});

document.getElementById('subject').addEventListener('change', function() {
    if (this.value !== '') {
        document.getElementById('subjectError').style.display = 'none';
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        document.getElementById('messageError').style.display = 'none';
    }
});

// Log to console when page loads (for learning purposes)
console.log('Contact form page loaded successfully!');
console.log('Open the browser console to see form submissions');