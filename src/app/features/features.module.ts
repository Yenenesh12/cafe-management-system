import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from '../features/home/home.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { UsersComponent } from './admin/users/users.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { CreatBankAccountComponent } from './creat-bank-account/creat-bank-account.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CartModalComponent } from './order/cart-modal/cart-modal.component';
import { OrderComponent } from './order/order.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [






    ContactComponent,
                 AdminContactComponent,
                 CreatBankAccountComponent,
                 CartModalComponent,

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
    NgModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HomeComponent,
     OrderComponent,
     CreatBankAccountComponent

  ]
})
export class FeaturesModule { }
