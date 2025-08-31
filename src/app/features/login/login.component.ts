import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { TokenStorageService } from '../../core/services/token-storage.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  showPassword: boolean = false;
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let form = this.loginForm.value;
    this.authService.login(form.email, form.password).subscribe((res) => {
      if (res) {
        this.router.navigate([this.returnUrl]);
        this.tokenStorageService.saveToken(res.data);
        sessionStorage.setItem('currentUser', res.data);
        sessionStorage.setItem('token', res.data);
      } else {
        this.toastr.error(res.message || 'Login failed');
        this.loading = false;
      }
    });
    // this.authService.login(this.f['email'].value, this.f['password'].value)
    //   .subscribe(
    //     () => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.toastr.error(error.error.message || 'Login failed');
    //       this.loading = false;
    //     });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
