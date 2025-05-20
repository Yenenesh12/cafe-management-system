import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { UsersComponent } from './features/admin/users/users.component';
import { BillListComponent } from './features/bill-list/bill-list.component';
import { CategoryFormComponent } from './features/category-form/category-form.component';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { CreateBillComponent } from './features/create-bill/create-bill.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProductFormComponent } from './features/product-form/product-form.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { SignupComponent } from './features/signup/signup.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/add', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'categories/add', component: CategoryFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'categories/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillListComponent, canActivate: [AuthGuard] },
  { path: 'bills/create', component: CreateBillComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/bills', pathMatch: 'full' },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
