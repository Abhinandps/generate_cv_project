import { Injectable, OnDestroy } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PermissionService } from '../services/permission/permission.service';

@Injectable()
export class IdleService implements OnDestroy {
  private timeoutDuration: number = 3600; // 60 minutes

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    public permissionService: PermissionService,
  ) {
    this.configureIdle();
  }

  private configureIdle() {
    this.idle.setIdle(this.timeoutDuration);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => this.onTimeout());
    this.idle.onIdleStart.subscribe(() => this.showIdleWarning());

    this.keepalive.interval(5);

    this.idle.watch();
  }

  private showIdleWarning() {
    Swal.fire({
      title: 'Session Timing Out',
      text: 'You will be logged out in 5 seconds!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#5890a3',
      cancelButtonColor: '#d22329',
      confirmButtonText: 'Keep me logged in!',
    }).then((result) => {
      if (result.value) {
      }
    });
  }

  private onTimeout() {
    localStorage.clear();
    Swal.fire('Timed Out!', 'Your session has timed out. Please log in again!', 'warning');
    this.permissionService.clearPermissions();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.idle.stop();
    this.keepalive.stop();
  }
}
