import { Component, OnInit } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { BillService } from '../../core/services/bill.service';
import { SavePdfService } from '../../core/services/save-pdf.service';
import { Bill } from '../../shared/models/bill.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import{HttpClientModule} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bill-list',
  imports: [MatCardModule,MatIconModule,MatSpinner,MatTableModule,MatCardContent,CommonModule,HttpClientModule,
    MatButtonModule,MatProgressSpinnerModule,MatSnackBarModule ],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills: any[] = [];
  displayedColumns: string[] = ['uuid', 'name', 'email', 'totalAmount', 'createdAt', 'actions'];
  isLoading = true;
  isAdmin = false;

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
    this.billService.getBills().subscribe(
      (bills) => {
        this.bills = bills;
        console.log(bills);
        this.isLoading = false;
      },
      (error) => {
        this.snackBar.open('Error loading bills', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }


  generateReport(): void {
    this.router.navigate(['bills/create', ]);
  }

  downloadPdf(uuid: string): void {
    this.billService.getPdf(uuid).subscribe(
      (pdfBlob) => {
        this.savePdfService.savePdf(pdfBlob, `bill_${uuid}.pdf`);
        this.snackBar.open('PDF downloaded successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        this.snackBar.open('Error downloading PDF', 'Close', { duration: 3000 });
      }
    );
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }

  formatCurrency(amount: number): string {
    return '$' + amount.toFixed(2);
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
