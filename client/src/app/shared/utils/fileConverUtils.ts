export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

export function base64ToUint8Array(base64String: string): Uint8Array {
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const byteArray = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  return byteArray;
}
