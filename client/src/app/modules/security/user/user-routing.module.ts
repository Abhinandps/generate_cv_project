import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ContainerComponent } from '../../../layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
  },
  {
    path: 'user',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        canActivate: [],
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        canActivate: [],
      },

      { path: 'view-user/:id', component: UserViewComponent, canActivate: [] },
      { path: 'edit-user/:id', component: UserUpdateComponent, canActivate: [] },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
