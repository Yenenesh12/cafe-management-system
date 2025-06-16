import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BillService } from '../../core/services/bill.service';
import { SavePdfService } from '../../core/services/save-pdf.service';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatCardContent,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills: Bill[] = [];
  paginatedBills: Bill[] = [];
  displayedColumns: string[] = ['uuid', 'name', 'email', 'totalAmount', 'createdAt', 'actions'];
  isLoading = true;
  isAdmin = false;

  // Pagination properties
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];

  constructor(
    private billService: BillService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private savePdfService: SavePdfService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadBills();
  }

  loadBills(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    this.billService.getBills(token).subscribe(
      (bills) => {
        this.bills = bills;
        this.updatePaginatedBills();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading bills:', error);
        this.snackBar.open('Error loading bills', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedBills();
  }

  updatePaginatedBills() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBills = this.bills.slice(startIndex, endIndex);
  }

  generateReport(): void {
    this.router.navigate(['bills/create']);
  }

  downloadPdf(uuid: string): void {
    this.billService.getPdf(uuid).subscribe({
      next: (pdfBlob) => {
        const downloadUrl = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `bill_${uuid}.pdf`;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
        this.snackBar.open('PDF downloaded successfully', 'Close', { duration: 2000 });
      },
      error: (error) => {
        console.error('Download error:', error);
        this.snackBar.open('Error downloading PDF', 'Close', { duration: 3000 });
      }
    });
  }

  deleteBill(id: number): void {
    if (confirm('Are you sure you want to delete this bill?')) {
      this.billService.deleteBill(id).subscribe(
        (response) => {
          this.snackBar.open(response.message, 'Close', { duration: 2000 });
          this.loadBills();
        },
        (error) => {
          this.snackBar.open('Error deleting bill', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
