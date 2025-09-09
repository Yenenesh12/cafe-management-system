import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../core/services/common.service';
import { UserService } from '../../../core/services/user.service';
import { UserDto } from '../../../shared/models/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserDto[] = [];
 selectedFile: File | null = null;
imagePreview: string | ArrayBuffer | null = null;
submitted = false;
loading = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  get paginatedUsers(): UserDto[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }


onFileChange(event: any) {
  const file = event.target.files[0];
  this.selectedFile = file;

  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.toastr.error('Invalid file type. Only images are allowed.');
      this.selectedFile = null;
      this.imagePreview = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

onSubmitUpdate(user: any) {
  this.submitted = true;

  const formData = new FormData();
  formData.append('Id', user.id);
  formData.append('FullName', user.fullName);
  formData.append('Email', user.email);
  formData.append('ContactNumber', user.contactNumber);
  if (user.username) formData.append('Username', user.username);
  if (user.password) formData.append('Password', user.password);
  if (user.roleName) formData.append('RoleName', user.roleName);
  if (user.isActive !== undefined && user.isActive !== null)
    formData.append('IsActive', user.isActive.toString());
  if (this.selectedFile) formData.append('Photo', this.selectedFile);

  this.loading = true;
  this.userService.updateUser(formData).subscribe({
    next: (res) => {
      this.toastr.success(res.message || 'User updated successfully');
      this.loadUsers(); // refresh list
      this.loading = false;
      this.imagePreview = null;
      this.selectedFile = null;
    },
    error: (err) => {
      this.toastr.error(err.error?.message || 'Update failed');
      this.loading = false;
    }
  });
}

approve(user: UserDto): void {
  if (!user.isActive) {
    this.loading = true;

    this.userService.approveUser(user).subscribe(
      () => {
        this.toastr.success('User approved successfully');
        this.loadUsers(); // refresh list
        this.loading = false;
      },
      () => {
        this.toastr.error('Failed to approve user');
        this.loading = false;
      }
    );

  } else {
    this.toastr.info('User already active');
  }
}



  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        res => {
          this.snackBar.open(res.message, 'Close', { duration: 2000 });
          this.loadUsers();
        },
        () => this.snackBar.open('Error deleting user', 'Close', { duration: 3000 })
      );
    }
  }

  getPhotoUrl(photoPath: string): string {
    return this.commonService.getImageFile(photoPath);
  }
}
