// change-password.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const newPassword = control.get('newPassword');
      const confirmPassword = control.get('confirmPassword');

      if (newPassword?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      }
      return null;
    };
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.changePassword(
      this.changePasswordForm.value.oldPassword,
      this.changePasswordForm.value.newPassword
    ).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully');
        this.changePasswordForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to change password');
      }
    });
  }
}
