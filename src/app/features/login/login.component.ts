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
import { JwtHelperService } from '@auth0/angular-jwt';
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
  private jwtHelper = new JwtHelperService();

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

onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;

        if (res?.token) {
          // Save token and current user
          localStorage.setItem('token', res.token);
          const decodedToken: any = this.jwtHelper.decodeToken(res.token);
          const user = {
            email: decodedToken.Email,
            roleName: decodedToken.roleName,
            token: res.token
          };
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.toastr.success(res.message || 'Login successful');

          // Route based on role
          if (user.roleName === 'admin') {
            this.router.navigate(['/admin']); // Admin dashboard route
          } else {
            this.router.navigate([this.returnUrl || '/']); // Normal user route
          }

        } else {
          this.toastr.error(res?.message || 'Login failed');
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error?.message || 'Login failed');
      }
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
