import CryptoJS from 'crypto-js';

const encryptionKey = 'HAlNcbJsirP3oEqA';

export function encryptData(data: any): string {
  try {
    const dataString = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataString, encryptionKey).toString();
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}
// Decryption method
export function decryptData(encryptedData: string): any {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    return error;
  }
}

// Authentication status check
export function isAuthenticated(): boolean {
  const keys = ['_mnp', '_uid', '_rle', '_mmn'];
  for (let key of keys) {
    if (!localStorage.getItem(key)) {
      return false;
    }
  }
  return true;
}
