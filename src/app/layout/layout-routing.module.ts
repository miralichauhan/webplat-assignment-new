import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UsersComponent } from '../pages/users/users.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent,data: { title: 'Dashboard' },canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent,data: { title: 'Users Page' },canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent,data: { title: 'Product Page' },canActivate: [AuthGuard] },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
