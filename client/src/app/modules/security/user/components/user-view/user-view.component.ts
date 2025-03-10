import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecurityService } from '../../../../../services/domain/security/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
  standalone: false
})
export class UserViewComponent implements OnInit, OnDestroy {
  user: any = {};
  companyIds: any = {};
  companies: any = {};
  initialized = false;
  private subscription = new Subject<void>();

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.securityService
      .getUserById(userId)
      .pipe(takeUntil(this.subscription))
      .subscribe((response: any) => {
        this.user = response.data;
      });
  }
  OnCancel() {
    this.router.navigate(['user']);
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
