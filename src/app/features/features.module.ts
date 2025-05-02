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
import { BillListComponent } from './bill-list/bill-list.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



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
    BillListComponent,
    CreateBillComponent,
    MatCardModule,
    MatFormFieldModule,
   
  ]
})
export class FeaturesModule { }
