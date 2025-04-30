import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardStats } from '../../shared/models/dashboard.model';
import { CommonModule } from '@angular/common';

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.dashboardService.getDashboardDetails().subscribe(
      (response) => {
        this.dashboardData = response;
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Failed to load dashboard data');
        this.isLoading = false;
        console.error(error);
      }
    );
  }
}
