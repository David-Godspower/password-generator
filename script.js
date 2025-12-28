// --- 1. SETUP & SELECT ELEMENTS ---
const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

const lengthRange = document.getElementById('lengthRange');
const lengthInput = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');

const generateBtn = document.getElementById('generateBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const copyBtn = document.getElementById('copyBtn');
const strengthIndicator = document.getElementById('strengthIndicator');

// --- 2. THE CORE FUNCTIONS ---

// Function to calculate and show strength
function checkStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Symbols

    strengthIndicator.className = ''; // Reset classes

    if (strength <= 2) {
        strengthIndicator.textContent = "Strength: Weak";
        strengthIndicator.classList.add('weak');
    } else if (strength <= 4) {
        strengthIndicator.textContent = "Strength: Medium";
        strengthIndicator.classList.add('medium');
    } else {
        strengthIndicator.textContent = "Strength: Strong";
        strengthIndicator.classList.add('strong');
    }
}

// Function to generate the password
function generatePassword(length, upper, lower, number, symbol) {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let allChars = '';
    if (upper) allChars += upperChars;
    if (lower) allChars += lowerChars;
    if (number) allChars += numberChars;
    if (symbol) allChars += symbolChars;
    
    if (allChars === '') return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

// Main Wrapper Function to Gather Inputs and Update UI
function updatePassword() {
    const length = parseInt(lengthInput.value);
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
    passwordDisplay.value = password;
    checkStrength(password);
}

// --- 3. EVENT LISTENERS (Real-time Logic) ---

// Sync Slider -> Number Box
lengthRange.addEventListener('input', (e) => {
    lengthInput.value = e.target.value;
    updatePassword(); // Generate immediately
});

// Sync Number Box -> Slider
lengthInput.addEventListener('input', (e) => {
    lengthRange.value = e.target.value;
    updatePassword(); // Generate immediately
});

// Watch Checkboxes for changes
uppercaseEl.addEventListener('change', updatePassword);
lowercaseEl.addEventListener('change', updatePassword);
numbersEl.addEventListener('change', updatePassword);
symbolsEl.addEventListener('change', updatePassword);

// Keep the manual button working too (users still expect it)
generateBtn.addEventListener('click', updatePassword);

// Copy to Clipboard Logic
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.value;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.backgroundColor = "#218838"; 
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.backgroundColor = "#28a745"; 
        }, 2000);
    });
});

// --- 4. INITIALIZATION ---
// Generate a password as soon as the page loads so it's not empty
updatePassword();