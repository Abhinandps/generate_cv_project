import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor() {}

  load(): Promise<void> {
    // Specify void as the type argument for the Promise
    // Perform any initialization logic here, such as loading configuration
    return new Promise<void>((resolve, reject) => {
      // Example initialization (replace with your actual initialization logic)
      setTimeout(() => {
        resolve(); // Resolve with void since no specific value is returned
      }, 2000); // Simulating a delay for initialization
    });
  }
}
