import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BillService } from '../../core/services/bill.service';
import { Product } from '../../shared/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { Products } from '../../shared/models/bill.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-create-bill',
  imports: [  MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardModule,
    CommonModule,
    MatOption,MatIcon,
    MatSpinner,MatCardModule,MatListModule,FormsModule,MatSelectModule

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
      contactNumber: ['', Validators.required],
      paymentMethod: ['Cash', Validators.required],
      productDetails: [[]],
      totalAmount: [0]
    });
  }

  ngOnInit(): void {
    // Load products from product service
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
    product.quantity = quantity;
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
}
