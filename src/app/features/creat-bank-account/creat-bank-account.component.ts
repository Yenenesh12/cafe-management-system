import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BankAccount, BankAccountService } from '../../core/services/bank-account.service';

@Component({
  selector: 'app-creat-bank-account',
  standalone: true,
  imports: [NgbModalModule, CommonModule, FormsModule],
  templateUrl: './creat-bank-account.component.html',
  styleUrls: ['./creat-bank-account.component.css'] // ✅ should be styleUrls (plural)
})
export class CreatBankAccountComponent {

  newAccount: BankAccount = {
    userId:0 ,
    accountNumber: '',
    balance: 0
  };

  userIdToSearch: number = 0;
  userAccount?: BankAccount;
  message: string = '';

  constructor(private bankAccountService: BankAccountService) {}

  createAccount() {
    this.bankAccountService.createAccount(this.newAccount).subscribe({
      next: (res: any) => {
        // ✅ Handle both response types
        if (res?.account) {
          this.userAccount = res.account;
          this.message = res.message || 'Account created successfully ✅';
        } else {
          this.userAccount = res;
          this.message = 'Account created successfully ✅';
        }

        // Reset form
        this.newAccount = { userId: 0, accountNumber: '', balance: 0 };
      },
      error: (err) => {
        this.message = err.error?.message || '❌ Error creating account';
      }
    });
  }

  getAccount() {
  this.bankAccountService.getAccountByUser(this.userIdToSearch).subscribe({
    next: (res: BankAccount) => {
      console.log('Backend Response:', res); // 👀 should print the DTO
      this.userAccount = res;  // ✅ Direct assignment
      this.message = 'Account found ✅';
    },
    error: (err) => {
      console.error('Error fetching account:', err);
      this.userAccount = undefined;
      this.message = err.error?.message || '❌ No account found';
    }
  });
}

}



