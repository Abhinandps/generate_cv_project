/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../../../core/models/security/user/role.model';
import { SecurityService } from '../../../../../services/domain/security/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import bcrypt from 'bcryptjs';
import { ToasterService } from '../../../../../services/common/toaster/toaster.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, takeUntil } from 'rxjs';
import { Region } from '../../../../../core/models/security/user/region.model';
import { User } from '@/core/models/security/user/user.model';
import { UserType } from '@/constants/userTypes.enum';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
  standalone: false
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  updateUserForm!: FormGroup;
  userTypes: string[] = [UserType.EMPLOYEE];
  roles: Role[] = [];
  designations: any[] = [];
  regions: Region[] = [];
  users: User[] = [];
  user: any = {};
  userId!: string | null;
  companies!: any;
  showCurrentPassword = false;
  showNewPassword = false;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownConfig: IDropdownSettings = {};
  defaultText = 'Select Companies';
  initialized = false;
  private subscription = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.createUserForm();
    this.securityService
      .getUserById(this.userId)
      .pipe(takeUntil(this.subscription))
      .subscribe((response: any) => {
        this.user = response;
        console.log(this.user)
        this.patchFormValues();
        this.initialized = true;
      });
  }
  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  createUserForm() {
    this.updateUserForm = this.fb.group({
      id: [this.userId],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      summary: ['', [Validators.required]],
    });
  }
  patchFormValues() {
    this.updateUserForm.patchValue({
      email: this.user.email,
      name: this.user.name,
      phone: this.user.phone,
      summary: this.user.summary,
    });
  }

  onItemSelect(event: any) {}

  onItemDeSelect(event: any) {}
  onSubmit() {
    const data = this.updateUserForm.getRawValue();
    data.selectedItems = this.selectedItems;
    if (!this.updateUserForm.valid) {
      this.toasterService.error('User Updation Failed, Invalid form.');
      return;
    }
    const { currentPassword, newPassword, password, ...updatedData } = this.updateUserForm.value;
    const storedPassword = this.user.password;
    updatedData.companyId = this.selectedItems;

    if (newPassword) {
      this.validateCurrentPassword(currentPassword, storedPassword).then((isMatch) => {
        if (isMatch) {
          updatedData.password = newPassword;
          this.updateUser(updatedData);
        } else {
          this.toasterService.error('Current password is incorrect');
        }
      });
    } else {
      this.updateUser(updatedData);
    }
  }

  private validateCurrentPassword(currentPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(currentPassword, storedPassword);
  }

  private updateUser(updatedData: any) {
    this.securityService
      .updateUser(updatedData)
      .pipe(takeUntil(this.subscription))
      .subscribe(
        () => {
          this.toasterService.success('User Updated successfully.');

          this.router.navigate(['user']);
        },
        (_error) => {
          this.toasterService.error('User Updation Failed.');
        },
      );
  }

  onCancel() {
    this.router.navigate(['user']);
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

  onSelectionChange(selectedIds: string[]) {
    this.selectedItems = selectedIds;
  }
}
