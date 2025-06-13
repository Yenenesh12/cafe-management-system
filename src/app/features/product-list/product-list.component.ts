import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule,FormsModule,CommonModule,],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
        console.log(response)
        this.filteredProducts = [...this.products];
      },
      (error) => {
        this.toastr.error('Failed to load products');
        console.error(error);
      }
    );
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  addNewProduct(): void {
    this.router.navigate(['products/add', ]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.loadProducts();
        },
        (error) => {
          this.toastr.error('Failed to delete product');
          console.error(error);
        }
      );
    }
  }

  toggleStatus(product: any): void {
    const newStatus = product.status === 'true' ? 'false' : 'true';
    const updatedProduct = { ...product, status: newStatus };

    this.productService.updateProductStatus(updatedProduct).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.loadProducts();
      },
      (error) => {
        this.toastr.error('Failed to update product status');
        console.error(error);
      }
    );
  }
}
