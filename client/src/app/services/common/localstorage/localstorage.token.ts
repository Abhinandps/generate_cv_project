import { InjectionToken } from '@angular/core';

export const LocalStorageToken = new InjectionToken<Storage | null>('local storage', {
  providedIn: 'root',
  factory() {
    if (typeof window !== 'undefined') {
      return window.localStorage;
    } else {
      // Handle cases where window or localStorage is not available
      return null;
    }
  },
});
