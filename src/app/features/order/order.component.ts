import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,MatCardModule ,MatButtonModule,NgbModalModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  products: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  filteredProducts: any[] = [];
  loading: boolean = true;
 selectedProduct:any;
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private  modalService:NgbModal
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

loadProducts(): void {
  this.productService.getAllProducts().subscribe({
    next: (response) => {
      console.log('API response:', response); // 👈 check data in console
      this.products = response;
      this.categories = [...new Set(this.products.map(p => p.categoryName))];
      this.categories.unshift('All');
      this.filteredProducts = [...this.products];
      this.loading = false;
    },
    error: (err) => {
      this.toastr.error('Failed to load products');
      console.error(err);
      this.loading = false;
    }
  });
}



  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.categoryName === category);
    }
  }

   addToCart(product: any): void {
    const modalRef = this.modalService.open(CartModalComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.product = product; // pass product to modal
    this.toastr.success(`${product.name} added to cart`);
  }

  submit(){

  }

}
