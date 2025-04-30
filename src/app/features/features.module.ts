import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LoginComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    UsersComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    CategoryListComponent,
    CategoryFormComponent,
  ]
})
export class FeaturesModule { }
