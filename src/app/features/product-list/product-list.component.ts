import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCellDef } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, FormsModule, CommonModule,MatCellDef],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  pagedProducts: any[] = [];
  searchTerm: string = '';

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5;  // Show 5 items per page
  totalPages: number = 0;

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
        this.filteredProducts = [...this.products];
        this.updatePagination();
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
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.categoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;  // Reset to first page when filtering
    this.updatePagination();
  }

  // Pagination methods
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getDisplayEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredProducts.length);
  }

  // Existing methods remain unchanged
  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  addNewProduct(): void {
    this.router.navigate(['products/add']);
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
