import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BankAccount, BankAccountService } from '../../core/services/bank-account.service';

@Component({
  selector: 'app-create-bank-account',
  standalone: true,
imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent implements OnInit {
  balance: number = 0;
  account: BankAccount | null = null;
  message: string = '';

  constructor(private bankAccountService: BankAccountService) {}

  ngOnInit(): void {
    this.loadAccount();
  }

  // Fetch account from backend
  loadAccount() {
  this.bankAccountService.getAccountByUser().subscribe({
    next: (res) => {
      // ✅ Remove console.log
      this.account = res;  // this will automatically update the UI
      this.message = '';   // clear any previous message
    },
    error: (err) => {
      // ✅ Handle errors only for the UI
      if (err.status === 404) {
        this.message = 'No bank account found, please create one.';
        this.account = null;
      } else if (err.status === 401) {
        this.message = 'Unauthorized. Please login.';
        this.account = null;
      } else {
        this.message = 'Failed to load account.';
        this.account = null;
      }
    }
  });
}


  // Create new account
  createAccount() {
    this.bankAccountService.createAccount(this.balance).subscribe({
      next: (res) => {
        console.log('Account created:', res);
        this.message = res.message;
        this.account = res.account;
      },
      error: (err) => {
        console.error('Error creating account:', err);
        this.message = err.error?.message || 'Failed to create account';
      }
    });
  }
}
