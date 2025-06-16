import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  loading = false;
   // In your component.ts file
currentPage: number = 1;
itemsPerPage: number = 3; // You can change this to show more/fewer items per page

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res)=>{
      if(res){
        // console.log(res)
        this.users=res;

      }
    })
  }


get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.users.length);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
    }
  }


  updateStatus(user: { id: number; status: boolean ;email:string}) {
    this.loading = true;
    this.userService.updateUserStatus(user).subscribe(
      () => {
        this.toastr.success('User status updated successfully');
        this.loadUsers();
      },
      error => {
        this.toastr.error('Failed to update user status');
        this.loading = false;
      }
    );
  }


  toggleStatus(user: any): void {
    const newStatus = user.status === 'true' ? 'false' : 'true';
    const updatedStatus = { ...user, status: newStatus };

    this.userService.updateUserStatus(updatedStatus).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.loadUsers();
      },
      (error) => {
        this.toastr.error('Failed to update product status');
        console.error(error);
      }
    );
  }
deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'Close', { duration: 2000 });
          this.loadUsers();
        },
        (error) => {
          this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
