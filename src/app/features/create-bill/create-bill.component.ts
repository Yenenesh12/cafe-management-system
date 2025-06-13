// Component Class (create-bill.component.ts)
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BillService } from '../../core/services/bill.service';
import { ProductService } from '../../core/services/product.service';
import { Products } from '../../shared/models/bill.model';

@Component({
  selector: 'app-create-bill',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardModule,
    CommonModule,
    MatOption,
    MatIcon,
    MatSpinner,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
  billForm: FormGroup;
  product: Products[] = [];
  selectedProducts: Products[] = [];
  paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private billService: BillService,
    private snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductService
  ) {
    this.billForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
      paymentMethod: ['Cash', Validators.required],
      productDetails: [[]],
      totalAmount: [0]
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => this.product = products);
  }

  addProduct(product: Products): void {
    const existingProduct = this.selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
      existingProduct.total = existingProduct.quantity * existingProduct.price;
    } else {
      this.selectedProducts.push({
        ...product,
        quantity: 1,
        total: product.price
      });
    }
    this.updateForm();
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.updateForm();
  }

  updateQuantity(product: Products, quantity: number): void {
    if (quantity < 1) {
      quantity = 1;
      product.quantity = quantity;
    }
    product.total = product.quantity * product.price;
    this.updateForm();
  }

  updateForm(): void {
    const totalAmount = this.selectedProducts.reduce((sum, product) => sum + product.total, 0);
    this.billForm.patchValue({
      productDetails: this.selectedProducts,
      totalAmount: totalAmount
    });
  }

  onSubmit(): void {
    if (this.billForm.invalid || this.selectedProducts.length === 0) {
      this.snackBar.open('Please fill all required fields and add at least one product', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    const billData = {
      ...this.billForm.value,
      productDetail: JSON.stringify(this.billForm.value.productDetails)
    };

    this.billService.generateReport(billData).subscribe(
      (response) => {
        this.isLoading = false;
        this.snackBar.open('Bill generated successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/bills']);
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Error generating bill', 'Close', { duration: 3000 });
      }
    );
  }

  allowOnlyTenDigits(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const isDigit = /[0-9]/.test(event.key);
    if (!isDigit || input.value.length >= 10) {
      event.preventDefault();
    }
  }
}
