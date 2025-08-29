import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactMessage } from '../../shared/models/contact-message.model';

@Component({
  selector: 'app-admin-contact',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {

  messages: ContactMessage[] = [];
  selectedMessage?: ContactMessage;
  errorMessage = '';
  successMessage = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

 loadMessages() {
  this.contactService.getAllMessages().subscribe({
    next: (res) => {
      console.log(res);  // <-- check if 'id' exists
      this.messages = res;
    },
    error: (err) => this.errorMessage = 'Failed to load messages.'
  });
}


  viewMessage(id: number) {
    this.contactService.getMessageById(id).subscribe({
      next: (res) => this.selectedMessage = res,
      error: (err) => this.errorMessage = err.error?.message || 'Error fetching message'
    });
  }

  deleteMessage(id: number) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    this.contactService.deleteMessage(id).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.loadMessages();
        this.selectedMessage = undefined;
      },
      error: (err) => this.errorMessage = err.error?.message || 'Error deleting message'
    });
  }

  closeMessage() {
    this.selectedMessage = undefined;
  }
}
