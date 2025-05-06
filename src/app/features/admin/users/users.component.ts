import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res)=>{
      if(res){
        console.log(res)
        this.users=res;

      }
    })
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



}
