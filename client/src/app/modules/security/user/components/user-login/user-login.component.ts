import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { encryptData } from '../../../../../shared/utils/helper';
import { SecurityService } from '../../../../../services/domain/security/security.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../../services/common/toaster/toaster.service';
import { MenuService } from '../../../../../services/domain/menu/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { PermissionService } from '../../../../../services/permission/permission.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
  standalone: false
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isWaiting = false;
  showPassword = false;
  route!: string;
  errorMessage = '';

  private subscription = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private toasterService: ToasterService,
    private menuService: MenuService,
    private permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  handleLogin(): void {
    this.toasterService.custom('Authentication not completed.');
      this.router.navigate(['/user']);
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
