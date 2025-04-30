import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        this.toastr.error('Failed to load categories');
        console.error(error);
      }
    );
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.productForm.patchValue({
          name: response.name,
          description: response.description,
          price: response.price,
          categoryId: response.categoryId
        });
      },
      (error) => {
        this.toastr.error('Failed to load product');
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      productData.id = this.productId;
      this.productService.updateProduct(productData).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.router.navigate(['/products']);
        },
        (error) => {
          this.toastr.error('Failed to update product');
          console.error(error);
        }
      );
    } else {
      this.productService.addNewProduct(productData).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.router.navigate(['/products']);
        },
        (error) => {
          this.toastr.error('Failed to add product');
          console.error(error);
        }
      );
    }
  }
}
