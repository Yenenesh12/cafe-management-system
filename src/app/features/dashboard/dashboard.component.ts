import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardStats } from '../../shared/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardStats = {
    category: 0,
    Product: 0,
    bill: 0,
    user: 0
  };
  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
     this.isLoading = true;
    this.dashboardService.GetDetails().subscribe(
      (response) => {
        this.dashboardData = response;
        console.log(response)
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Failed to load dashboard data');
        this.isLoading = false;
        console.error(error);
      }
    );

  //   this.dashboardService.GetDetails().subscribe((res)=>{
  //     if(res){
  //       console.log(res)
  //       this.dashboardData=res;

  //     }
  //   })
  // }
  // }
  }}
