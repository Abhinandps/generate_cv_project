import { NgModule, Type } from '@angular/core';
import { SharedComponentsModule } from './components/components.module';
import { LocalStorageService } from '../services/common/localstorage/localstorage.service';
import { DirectivesModule } from './directives/directives.module';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../appConfig/appconfig.interface';
import { ApiHandlerService } from './services/api-handler.service';
import { APP_SERVICE_CONFIG } from '../appConfig/appconfig.service';

const SHARED_MODULES: any[] = [SharedComponentsModule];

@NgModule({
  providers: [
    LocalStorageService,
    {
      provide: 'IApiSecurity',
      useFactory: (httpClient: HttpClient, config: AppConfig) => {
        return new ApiHandlerService(httpClient, config.securityApiUrl);
      },
      deps: [HttpClient, APP_SERVICE_CONFIG],
    }
  ],
  declarations: [],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class SharedModule {}
