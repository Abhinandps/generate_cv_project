import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription, interval } from 'rxjs';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({ providedIn: 'root' })
export class NewVersionCheckerService {
  isNewVersionAvailable: boolean = false;
  intervalSource = interval(15 * 60 * 1000); // every 15 mins
  intervalSubscription!: Subscription;

  constructor(
    private swUpdate: SwUpdate,
    private zone: NgZone,
    private toasterService: ToasterService,
  ) {
    this.checkForUpdate();

    // Subscribe to version updates
    this.swUpdate.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this.zone.run(() => {
          this.isNewVersionAvailable = true;
        });
      }
    });
  }

  checkForUpdate(): void {
    this.intervalSubscription?.unsubscribe();
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.intervalSubscription = this.intervalSource.subscribe(async () => {
        try {
          const updateAvailable = await this.swUpdate.checkForUpdate();
          this.zone.run(() => {
            this.isNewVersionAvailable = updateAvailable;
          });
        } catch (error) {
          this.zone.run((error) => {
            this.toasterService.error(error.message);
          });
        }
      });
    });
  }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this.swUpdate
      .activateUpdate()
      .then(() => document.location.reload())
      .catch((error) => this.toasterService.error(error.message));
  }
}
