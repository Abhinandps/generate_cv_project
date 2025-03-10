import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './layout/container/container.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { Error500Component } from './shared/components/error500/error500.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/security/security.module').then((m) => m.SecurityModule),
      },
    ],
  },

  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/404' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
