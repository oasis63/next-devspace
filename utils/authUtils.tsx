// token.js

import {
  ENC_USER_DATA_KEY,
  IS_LOGGEDIN_KEY,
  TOKEN_KEY,
  USER_DATA_KEY,
} from "./constants";
import { User } from "./models";

export const setLocalStorageKeyData = (key: string, data: string) =>
  localStorage.setItem(key, data);

export const getLocalStorageKeyData = (key: string) =>
  localStorage.getItem(key);

export const removeLocalStorageKey = (key: string) =>
  localStorage.removeItem(key);

//   encryption / decryption user data in local

export function isUserLoggedIn() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(IS_LOGGEDIN_KEY) == "true";
  }
  return false;
}

export function removeUserLocalStorageData() {
  if (typeof window !== "undefined") {
    removeLocalStorageKey(TOKEN_KEY);
    removeLocalStorageKey(IS_LOGGEDIN_KEY);
    removeLocalStorageKey(USER_DATA_KEY);
    removeLocalStorageKey(ENC_USER_DATA_KEY);
  }
}

// user data encryptions
export function encryptData(data: User) {
  const encryptedData = btoa(JSON.stringify(data));
  return encryptedData;
}

export function decryptData(encryptedData: string) {
  const decryptedData = JSON.parse(atob(encryptedData));
  return decryptedData;
}

// higher secure encryption
export const highEncryptData = async (data: User) => {
  const text = JSON.stringify(data);
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(text);

  try {
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      dataBuffer
    );

    const encryptedData = {
      iv: Array.from(iv),
      data: new Uint8Array(encryptedBuffer),
    };
    return btoa(JSON.stringify(encryptedData));
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
};

export const highDecryptData = async (encryptedData: any) => {
  try {
    const decodedData = JSON.parse(atob(encryptedData));
    const iv = new Uint8Array(decodedData.iv);
    const dataBuffer = new Uint8Array(decodedData.data);

    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      dataBuffer
    );

    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decryption error:", error);
    throw error;
  }
};
