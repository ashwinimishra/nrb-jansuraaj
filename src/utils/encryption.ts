import CryptoJS from 'crypto-js';

// Secret key for encryption (in a real app, this would be stored securely)
const SECRET_KEY = 'your-secret-key-for-encryption';

export const encryptMobileNumber = (mobileNumber: string): string => {
    const encrypted = CryptoJS.AES.encrypt(mobileNumber, SECRET_KEY).toString();
    // Make URL-safe
    return encodeURIComponent(encrypted);
};

export const decryptMobileNumber = (encryptedMobile: string): string => {
    try {
        const decoded = decodeURIComponent(encryptedMobile);
        const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        return '';
    }
};

export const generateProfileUrl = (mobileNumber: string): string => {
    const encrypted = encryptMobileNumber(mobileNumber);
    return `${window.location.origin}/dashboard/${encrypted}`;
};