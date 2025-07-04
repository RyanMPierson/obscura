# Obscura

**Obscura** is a simple and secure web-based encryption tool for encrypting and decrypting messages using AES-GCM. Built with HTML, CSS, and JavaScript, it enables users to securely encode text using a passphrase and decode it only with the correct key.

## Features

- 🔐 AES-256 GCM encryption in the browser
- 🧠 Password-based key derivation using PBKDF2
- 👁️ Toggle visibility for passphrases
- 📱 Responsive and modern UI
- 🧩 No backend required — everything runs client-side

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/obscura.git
cd obscura
````

### Open in Browser

Simply open the `index.html` file in your browser.

## File Structure

```
obscura/
├── index.html        # Main HTML structure
├── style.css         # Styling (modern & responsive)
├── script.js         # Encryption logic and UI interactivity
└── README.md         # Project documentation
```

## Security

Obscura uses:

* **AES-GCM (256-bit)** for authenticated encryption
* **PBKDF2** with SHA-256 and 100,000 iterations for key derivation
* A unique **12-byte IV** for every encryption operation

All operations are performed in-browser using the Web Crypto API. No data is sent to any server.

> ⚠️ This tool is designed for demonstration and light personal use. For enterprise or mission-critical applications, consult a security professional.

## License

MIT License

---

Made with ❤️ for privacy.

```
