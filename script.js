

async function encrypt() {
    const passphrase = document.getElementById('encryptPass').value;
    const plaintext = document.getElementById('encryptText').value;

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, iv);

    const encodedText = new TextEncoder().encode(plaintext);
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedText
    );

    const output = {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(ciphertext))
    };

    document.getElementById('encryptedResult').value = btoa(JSON.stringify(output));
}

async function decrypt() {
    try {
        const passphrase = document.getElementById('decryptPass').value;
        const encryptedInput = document.getElementById('decryptText').value;
        const encrypted = JSON.parse(atob(encryptedInput));

        const iv = new Uint8Array(encrypted.iv);
        const data = new Uint8Array(encrypted.data);

        const key = await deriveKey(passphrase, iv);
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            key,
            data
        );

        const plaintext = new TextDecoder().decode(decrypted);
        document.getElementById('decryptedResult').value = plaintext;
    } catch (e) {
        document.getElementById('decryptedResult').value = 'Decryption failed.';
    }
}

async function deriveKey(passphrase, iv) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(passphrase),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: iv,
            iterations: 100000,
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

function togglePassVisibility(fieldId, checkbox) {
    const field = document.getElementById(fieldId);
    field.type = checkbox.checked ? 'text' : 'password';
}