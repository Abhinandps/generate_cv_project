/* eslint-disable @typescript-eslint/no-unused-vars */
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SeedService } from './core/services/seed.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './appConfig/appconfig.service';
import { environment } from '../environments/environment';
import { HeaderComponent } from './layout/header/header.component';
import { ContainerComponent } from './layout/container/container.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GuardsModule } from './core/guards/guards.module';
import { HasPermissionsDirective } from './services/permission/has-permissions.directive';
import { PermissionService } from './services/permission/permission.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdleModule } from './idle/idle.module';

export function seedDataFactory(seedService: SeedService) {
  return () => seedService.seed().toPromise();
}

@NgModule({
  declarations: [AppComponent, ContainerComponent, HeaderComponent],

  imports: [
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,

    // StoreDevTool
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    //feature

    // app
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GuardsModule,
    IdleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  exports: [ContainerComponent],
  providers: [
    HttpClient,
    provideClientHydration(),
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    ...(environment.seedEnabled
      ? [
          {
            provide: APP_INITIALIZER,
            useFactory: seedDataFactory,
            deps: [SeedService],
            multi: true,
          },
        ]
      : []),
    PermissionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
