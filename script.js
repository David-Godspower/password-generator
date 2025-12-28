// Character sets for password generation
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// DOM elements
const passwordInput = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthText = document.getElementById('strength-text');
const strengthBarFill = document.getElementById('strength-bar-fill');

// Update length value display
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';
    let password = '';

    // Build character set based on selected options
    if (uppercaseCheckbox.checked) charset += UPPERCASE;
    if (lowercaseCheckbox.checked) charset += LOWERCASE;
    if (numbersCheckbox.checked) charset += NUMBERS;
    if (symbolsCheckbox.checked) charset += SYMBOLS;

    // Validate that at least one option is selected
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }

    // Generate random password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Ensure at least one character from each selected type
    password = ensureCharacterTypes(password, length);

    passwordInput.value = password;
    calculateStrength(password);
}

// Ensure password contains at least one character from each selected type
function ensureCharacterTypes(password, length) {
    const selectedTypes = [];
    
    if (uppercaseCheckbox.checked) selectedTypes.push(UPPERCASE);
    if (lowercaseCheckbox.checked) selectedTypes.push(LOWERCASE);
    if (numbersCheckbox.checked) selectedTypes.push(NUMBERS);
    if (symbolsCheckbox.checked) selectedTypes.push(SYMBOLS);

    let passwordArray = password.split('');
    
    selectedTypes.forEach((type, index) => {
        const hasChar = passwordArray.some(char => type.includes(char));
        if (!hasChar && index < length) {
            const randomChar = type[Math.floor(Math.random() * type.length)];
            passwordArray[index] = randomChar;
        }
    });

    // Shuffle the password to randomize character positions
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}

// Calculate password strength
function calculateStrength(password) {
    let strength = 0;
    const length = password.length;

    // Length contribution
    if (length >= 8) strength += 1;
    if (length >= 12) strength += 1;
    if (length >= 16) strength += 1;

    // Character variety contribution
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    // Update UI based on strength
    strengthBarFill.className = 'strength-bar-fill';
    
    if (strength <= 3) {
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#f44336';
        strengthBarFill.classList.add('strength-weak');
    } else if (strength <= 5) {
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#ff9800';
        strengthBarFill.classList.add('strength-medium');
    } else {
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#4caf50';
        strengthBarFill.classList.add('strength-strong');
    }
}

// Copy password to clipboard
async function copyToClipboard() {
    const password = passwordInput.value;
    
    if (!password) {
        alert('Please generate a password first!');
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        
        // Visual feedback
        copyBtn.classList.add('copied');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        passwordInput.select();
        document.execCommand('copy');
        
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
    }
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generate initial password on page load
window.addEventListener('load', generatePassword);

// Allow Enter key to generate password
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generatePassword();
    }
});
