import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppConfig } from './appconfig.interface';

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
  production: environment.production,
  seedEnabled: environment.seedEnabled,
  securityApiUrl: environment.securityApiUrl,
};
