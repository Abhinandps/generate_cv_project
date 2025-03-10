import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APP_SERVICE_CONFIG } from '../../appConfig/appconfig.service';
import { AppConfig } from '../../appConfig/appconfig.interface';

@Injectable({
  providedIn: 'root',
})
export class SeedService {
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
  ) {}

  seed(): Observable<any> {
    if (!this.config.seedEnabled) {
      return of(null);
    }

    // Replace with your actual seeding logic
    const seedData = [
      { id: 1, name: 'Sample Item 1' },
      { id: 2, name: 'Sample Item 2' },
      { id: 3, name: 'Sample Item 3' },
    ];

    // Example of posting seed data to an endpoint
    return this.http.post('/api/seed', seedData).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Seeding failed', error);
        return of(null);
      }),
    );
  }
}
