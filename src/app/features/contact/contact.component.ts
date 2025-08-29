import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactMessage } from '../../shared/models/contact-message.model';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    const message: ContactMessage = this.contactForm.value;

    this.contactService.sendMessage(message).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Message sent successfully!';
        this.contactForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'An error occurred.';
      }
    });
  }
}
