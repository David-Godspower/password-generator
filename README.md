# 🔐 Password Generator

A lightweight, responsive password generator built with HTML, CSS, and vanilla JavaScript. Customize the password length and character types, view an immediate strength estimate, and copy the generated password to your clipboard.

> **Security note:** This project uses JavaScript's `Math.random()` for educational/demo purposes. For passwords protecting sensitive accounts, use a generator based on the Web Crypto API or a trusted password manager.

## 🚀 Live demo

[**View the live demo**](https://david-godspower.github.io/password-generator/)

## ✨ Features

- **Custom password length:** Generate passwords from 4 to 32 characters.
- **Synchronized controls:** Adjust the length with either a number input or range slider.
- **Character customization:** Include or exclude uppercase letters, lowercase letters, numbers, and symbols.
- **Real-time generation:** Passwords regenerate when the length or character options change.
- **Manual generation:** Use the **Generate Password** button whenever you want a new value.
- **Strength estimate:** Shows a Weak, Medium, or Strong label based on length and character composition.
- **One-click copy:** Copies the current password using the browser Clipboard API and displays temporary success feedback.
- **Responsive design:** The interface adapts to smaller screens.
- **No backend:** Password generation happens locally in the browser.

## 🛠️ Built with

- **HTML5** for structure, form controls, and accessibility labels
- **CSS3** for the gradient layout, responsive styling, custom slider, and strength colors
- **JavaScript (ES6+)** for password generation, validation feedback, event handling, and clipboard integration
- **Font Awesome** for the copy and footer icons
- **Google Fonts** for Poppins and Roboto Mono typography

## 🎯 How it works

The generator builds a character pool from the selected options:

- Uppercase: `A-Z`
- Lowercase: `a-z`
- Numbers: `0-9`
- Symbols: `!@#$%^&*()_+[]{}|;:,.<>?`

It then selects random characters from that pool until the requested length is reached. The strength indicator evaluates:

- Whether the password is at least 8 characters long
- Whether it is at least 12 characters long
- Whether it contains uppercase letters
- Whether it contains numbers
- Whether it contains symbols

## 🚀 Getting started

### Prerequisites

You only need a modern web browser. No build tools, package manager, or backend runtime is required.

### Run locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/david-godspower/password-generator.git
   ```

2. **Open the project directory**

   ```bash
   cd password-generator
   ```

3. **Launch the app**

   Open `index.html` directly in your browser, or use the **Live Server** extension in VS Code.

   A local server such as `localhost` is recommended for consistent Clipboard API support.

## 📋 Usage

1. Set a password length between 4 and 32 characters.
2. Toggle uppercase letters, lowercase letters, numbers, and symbols as needed.
3. Click **Generate Password**, or let the app regenerate the password automatically after changing a setting.
4. Review the strength estimate below the generated password.
5. Click **Copy to Clipboard** to copy the password.

At least one character category must be selected for the generator to produce a password.

## 📁 Project structure

```text
password-generator/
├── index.html    # Page structure and form controls
├── styles.css    # Layout, theme, responsive styles, and components
├── script.js     # Password generation and interaction logic
├── LICENSE       # MIT license
└── README.md     # Project documentation
```

## 🔒 Privacy

The application does not send generated passwords to a server. Generation and strength estimation occur in the browser. Clipboard access is only used when you explicitly click **Copy to Clipboard**.

For production-grade password generation, replace `Math.random()` with `crypto.getRandomValues()` and add unbiased character selection.

## 👤 Author

**David Godspower Ajala**

- [Portfolio](https://david-godspower.github.io/david-portfolio/)
- [LinkedIn](https://www.linkedin.com/in/david-godspower-ajala/)
- [X](https://x.com/DavidGAjala)
- [GitHub](https://github.com/david-godspower)
- [Email](mailto:ajaladavid11@gmail.com)

## 📄 License

This project is available under the [MIT License](LICENSE).
