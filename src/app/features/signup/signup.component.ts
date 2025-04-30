import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.signup(this.signupForm.value)
      .subscribe(
        () => {
          this.toastr.success('Registration successful. Please wait for admin approval.');
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error(error.error.message || 'Registration failed');
          this.loading = false;
        });
  }
}
