/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../../../core/models/security/user/role.model';
import { SecurityService } from '../../../../../services/domain/security/security.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../../../../services/common/toaster/toaster.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subject, takeUntil } from 'rxjs';
import { Region } from '../../../../../core/models/security/user/region.model';
import { User } from '@/core/models/security/user/user.model';
import { UserService } from '../../../../../services/common/user/userService';
import { UserType } from '@/constants/userTypes.enum';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: false
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  createUserForm!: FormGroup;
  userTypes: UserType[] = [UserType.EMPLOYEE];
  roles: Role[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  currentUserId!: string;
  designations: any[] = [];
  regions: Region[] = [];
  companies: any[] = [];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownConfig: IDropdownSettings = {};
  defaultText = 'Select Companies';
  private subscription = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private userService: UserService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]{10,}')]),
      summary: new FormControl('', [Validators.required]),
    });

    this.securityService
      .getUsers()
      .pipe(takeUntil(this.subscription))
      .subscribe((response: any) => {
        this.users = response.data.filter((user: any) => user._id !== this.currentUserId);
      });
  }


  onSubmit() {
    if (this.createUserForm.valid) {
      this.securityService
        .createUser(this.createUserForm.value)
        .pipe(takeUntil(this.subscription))
        .subscribe(
          (response) => {
            this.toasterService.success('User Creation successfully.');
            this.router.navigate(['user']);
          },
          (error) => {
            this.toasterService.error('User Creation Failed.');
          },
        );
    } else {
      this.toasterService.error('Please fill out the form correctly.');
    }
  }

  OnCancel() {
    this.router.navigate(['user']);
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
