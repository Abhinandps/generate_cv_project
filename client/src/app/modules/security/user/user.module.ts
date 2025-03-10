import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { SharedComponentsModule } from '../../../shared/components/components.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserListComponent,
    UserViewComponent,
    UserUpdateComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
})
export class UserModule {}
