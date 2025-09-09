import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;  // `forgotPasswordForm` is assumed to be your form group
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.f['email'].invalid) {
      return;
    }

    this.loading = true;
    // this.userService.forgotPassword(this.f['email'].value).subscribe(
    //   () => {
    //     this.toastr.success('Password sent to your email if account exists');
    //     this.loading = false;
    //   },
    //   error => {
    //     this.toastr.error('Failed to process forgot password request');
    //     this.loading = false;
    //   }
    // );
  }

  }

