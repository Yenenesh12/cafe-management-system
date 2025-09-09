import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  loading = false;
  imagePreview: string | ArrayBuffer | null = null;
   selectedFile: File | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      photo: [null, [Validators.required]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+251[0-9]{9}$/), // Starts with +251 and 9 digits
        ],
      ],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) return;
         let  formData = new FormData();
         formData.append('Photo', this.selectedFile as Blob);
         formData.append('FullName', this.signupForm.get('fullName')?.value);
          formData.append('Email', this.signupForm.get('email')?.value);
          formData.append('ContactNumber', this.signupForm.get('contactNumber')?.value);
          formData.append('Username', this.signupForm.get('username')?.value);
          formData.append('Password', this.signupForm.get('password')?.value);

    this.loading = true;
    this.userService.signup(formData).subscribe((res)=>{
    console.log(res, "result");
      if(res){
      this.toastr.success(
            'Registration successful. Wait for admin approval.'
          );
          this.loading=false;
          this.router.navigate(['/login']);
        }
        else{
          this.toastr.error('Registration failed');
          this.loading = false;
        }
    })
    // this.userService
    //   .signup({ ...this.signupForm.value, isActive: false }) // Always inactive
    //   .subscribe(
    //     () => {
    //       this.toastr.success(
    //         'Registration successful. Wait for admin approval.'
    //       );
    //       this.router.navigate(['/login']);
    //     },
    //     (error) => {
    //       this.toastr.error(error.error.message || 'Registration failed');
    //       this.loading = false;
    //     }
    //   );
  }
  allowOnlyDigitsWithPlus(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const isDigit = /[0-9]/.test(event.key);
    const isPlus =
      event.key === '+' &&
      input.selectionStart === 0 &&
      !input.value.includes('+');

    if (!isDigit && !isPlus) {
      event.preventDefault();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
         this.selectedFile=file;
    if (file) {
      // Validate file type (image only)
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        this.signupForm.patchValue({ photo: null });
        this.signupForm.get('photo')?.setErrors({ invalidType: true });
        this.imagePreview = null;
        return;
      } else {
        this.signupForm.patchValue({ photo: file });
        this.signupForm.get('photo')?.updateValueAndValidity();
        // Image preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
