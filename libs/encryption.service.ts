import CryptoJS from 'crypto-js';
 
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || '';

 
export const encrypt = (text: string): string => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
};
 
export const decrypt = (data: string): string => {
  const [ivHex, encryptedHex] = data.split(':');
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: encrypted });
 
  const decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
 
  return decrypted.toString(CryptoJS.enc.Utf8);
};