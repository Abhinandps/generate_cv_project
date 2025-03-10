import { Injectable, Inject } from '@angular/core';
import { LocalStorageToken } from './localstorage.token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(LocalStorageToken) private localStorage: Storage | null) {}

  /**
   * Adds an item to localStorage.
   * @param key The key under which to store the item.
   * @param item The item to store.
   */
  addItem<T>(key: string, item: T): void {
    if (this.localStorage) {
      const storedItems = this.getStoredItems<T>(key);
      storedItems.push(item);
      this.localStorage.setItem(key, JSON.stringify(storedItems));
    }
  }

  /**
   * Retrieves all stored items under a specific key from localStorage.
   * @param key The key under which items are stored.
   * @returns An array of stored items.
   */
  getStoredItems<T>(key: string): T[] {
    if (this.localStorage) {
      const storedItems = this.localStorage.getItem(key);
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  }

  /**
   * Retrieves a stored item under a specific key and an identifier from localStorage.
   * @param key The key under which items are stored.
   * @param identifier The identifier to find the item.
   * @param idKey The key of the identifier in the item.
   * @returns The stored item or null.
   */
  getStoredItem<T>(key: string, identifier: any, idKey: keyof T): T | null {
    const storedItems = this.getStoredItems<T>(key);
    return storedItems.find((item) => item[idKey] === identifier) || null;
  }

  /**
   * Removes an item from localStorage.
   * @param key The key under which the item is stored.
   * @param identifier The identifier to find the item to remove.
   * @param idKey The key of the identifier in the item.
   */
  removeItem<T>(key: string, identifier: any, idKey: keyof T): void {
    if (this.localStorage) {
      let storedItems = this.getStoredItems<T>(key);
      storedItems = storedItems.filter((item) => item[idKey] !== identifier);
      this.localStorage.setItem(key, JSON.stringify(storedItems));
    }
  }

  /**
   * Clears all stored items under a specific key from localStorage.
   * @param key The key under which items are stored.
   */
  clearStoredItems(key: string): void {
    if (this.localStorage) {
      this.localStorage.removeItem(key);
    }
  }
}
