import CryptoJS from "crypto-js";

// Get the encrypted password and the salt
const encryptedPassword = localStorage.getItem('password');
const salt = localStorage.getItem('salt');

// Regenerate the key
const key = CryptoJS.PBKDF2('secret', salt, {
    keySize: 256 / 32,
});

// Decrypt the password
const decryptedPassword = CryptoJS.AES.decrypt(
    encryptedPassword,
    key
).toString(CryptoJS.enc.Utf8);

// Use the decrypted password
console.log(decryptedPassword); // Pa$sword123!
