// Authentication Validation Logic

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[\d\s-]{10,15}$/;
    return re.test(phone);
}

function validatePasswordStrength(password) {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const companyName = document.getElementById('companyName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!fullName || !companyName || !email || !phone || !role || !password || !confirmPassword) {
            showToast('All fields are required.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showToast('Please enter a valid phone number (10-15 digits).', 'error');
            return;
        }

        if (!validatePasswordStrength(password)) {
            showToast('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showToast('Passwords do not match.', 'error');
            return;
        }

        // If validation passes, simulate successful signup
        showToast('Account created successfully! Redirecting to login...', 'success');
        
        // Save dummy email for login prefill if needed, but DO NOT save password
        sessionStorage.setItem('registeredEmail', email);

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    
    // Prefill email if coming from signup
    const registeredEmail = sessionStorage.getItem('registeredEmail');
    if (registeredEmail && document.getElementById('loginEmail')) {
        document.getElementById('loginEmail').value = registeredEmail;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;

        // Validation
        if (!email || !password || !role) {
            showToast('All fields are required.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate login
        showToast(`Logging in as ${role}...`, 'success');
        
        // Save logged-in user info (NO PASSWORD)
        sessionStorage.setItem('loggedInUser', email);
        sessionStorage.setItem('userRole', role);

        setTimeout(() => {
            if (role === 'Admin' || role === 'Manager') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'employee-dashboard.html';
            }
        }, 1500);
    });
}
